import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWithoutFill, testImage } from "../../../../assets/icons/svgIcons";
import { setAccState, setChapterState, setCourseState, setLessonState, setTestState } from "../../../../redux/reducers/addCourseState";
import { setChapterData, setLessonData } from "../../../../redux/reducers/overViewSlice";
import { addIconWhite } from "../../../../utils/icons";
// import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItemLesson from "./SortableItemLesson";
import { getParticularCourses } from "../../../autherisation/auth";
import { resetTestData } from "../../../../redux/reducers/testSlice";

export const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });
  // const [accState,setAccState]= useState(0);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const dispatch = useDispatch();
  const accState = useSelector((state) => state.addCourseState.accState);
  const courseId = useSelector((state) => state.addCourseState.courseId);


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [lessons, setLessons] = useState(
    props.items.lessonResponses
  );
  function handleDragEndLesson(event) {
    // console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setLessons((items) => {
        console.log("items", items);
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        console.log("oldIndex: " + oldIndex);
        console.log("newIndex :" + newIndex);
        // console.log(arrayMove(items, activeIndex, overIndex));
        // return arrayMove(items, activeIndex, overIndex);
        console.log(arrayMove(items, oldIndex, newIndex));
        return arrayMove(items, oldIndex, newIndex);

        // items: [2, 3, 1]   0  -> 2
        // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1]
      });
    }
  }

  const getChapterDetailApiCall = async (ele, id) => {
    const response = await getParticularCourses(ele._id);
    // if (response) {
    //   dispatch(setChapterData(response));
    // }
    const data = {
      chapterId: ele._id,
      chapterName: ele.chapterTitle,
      chapterNumber: id + 1,
    };
    dispatch(setChapterData(data));
  };

  return (
    <div className="Sortable-container">
      <>
        <button
          className="DragHandle"
          {...attributes}
          {...listeners}
          ref={setNodeRef}
          style={style}
        >
          <svg viewBox="0 0 20 20" width="12" className="drag">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
          </svg>
        </button>
        <div
          //   ref={setNodeRef} 
          style={style} {...attributes}
          key={props.id1}
          className="course-accordian"
          onClick={(e) => {
            e.stopPropagation();
            // alert("dropDown arrow presed")
            dispatch(setAccState(props.id1))
          }}
        >
          <div className="course-accordian-heading">
            <div className="course-accordian-container">
              <span className="course-accordian-container-title">
                Chapter {props.id1 + 1} - {props.items.chapterTitle}{" "}
              </span>
              {accState === props.id1 ? (
                <>
                  {/* <p className="course-accordian-container-state">
                              ^
                            </p> */}
                </>
              ) : (
                <>
                  <img
                    src={require("../../../../assets/DropdownArrow.png")}
                    className="course-accordian-container-state"
                  />
                </>
              )}
            </div>
            <div className="accordian-item-section-2-buttons">
              <div
                className="leftCourseDetail-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  // alert("delete arrow presed")
                }}
              >
                {deleteWithoutFill}
              </div>
              <div
                className="leftCourseDetail-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setChapterState(true));
                  dispatch(setTestState(false));
                  dispatch(setLessonState(false));
                  dispatch(setCourseState(false));
                  getChapterDetailApiCall(props.items, props.id1);
                  // alert("edit arrow presed")
                }}
              >
                <i class="fa-solid fa-pen-to-square fa-lg"></i>
              </div>
            </div>
          </div>
          <div
            className={
              (accState === props.id1 ? "accordian-show" : "") +
              "course-accordian-content"
            }
          >
            <div className="course-accordian-container-body">
              <div className="accordian-items">

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={
                    handleDragEndLesson
                  }
                >
                  <Container
                    className="p-3"
                    // style={{ width: "50%" }}
                    align="center"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <SortableContext
                      items={lessons.map((item) => item._id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {lessons.map((ele, id) => (
                        <SortableItemLesson
                          key={ele._id}
                          id={ele._id}
                          items={ele}
                          id2={id}
                        />
                      ))}
                    </SortableContext>
                  </Container>
                </DndContext>
                <div
                  className="leftCourseDetail-lessons-buttons"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setLessonData());
                    dispatch(setLessonState(true));
                    dispatch(setChapterState(false));
                    dispatch(setTestState(false));
                    dispatch(setCourseState(false))
                    // alert("edit arrow presed")
                  }}
                >
                  <div className="leftCourseDetail-addBtn">
                    <div className="myCourse-addBtn-icon">
                      {addIconWhite}
                    </div>
                    Add Lesson
                  </div>
                  {props.items.test ? null : (
                    <>
                      <div
                        className="leftCourseDetail-addBtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(resetTestData());
                          dispatch(setTestState(true));
                          dispatch(setLessonState(false));
                          dispatch(setChapterState(false));
                          dispatch(setCourseState(false))
                          // alert("edit arrow presed")
                        }}
                      >
                        <div className="myCourse-addBtn-icon">
                          {addIconWhite}
                        </div>
                        Add Test
                      </div>
                    </>
                  )}
                </div>

                {props.items.test && props.items.test.testId && (
                  <div className="accordian-item-test">
                    <div
                      className="accordian-item-section-2-test"
                      onClick={() => { }}
                    >
                      <div className="accordian-item-chapter-number">
                        {testImage}
                      </div>

                      <div className="accordian-item-section-2-para-test">
                        <span className="accordian-item-chapter-title">
                          {props.items.test.testTitle} bcju biew biweu iqb bci
                          bciqa kquwB
                        </span>

                        <div className="accordian-item-section-2-buttons-test">
                          <span className="accordian-item-chapter-duration">
                            {props.items.test.totalQuestions} questions
                          </span>
                          <div className="accordian-item-section-2-buttons">
                            <div
                              className="leftCourseDetail-delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                // alert("delete  presed");
                              }}
                            >
                              {deleteWithoutFill}
                            </div>
                            <div
                              className="leftCourseDetail-edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(setTestState(true));
                                dispatch(setLessonState(false));
                                dispatch(setChapterState(false));
                                dispatch(setCourseState(false))
                                // alert("edit presed");
                              }}
                            >
                              <i class="fa-solid fa-pen-to-square fa-lg"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
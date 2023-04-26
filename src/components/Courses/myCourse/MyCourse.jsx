import "./MyCourse.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourseDetailDraft, setCourseDetailPublishedState, setDraftCoursesPageNum, setPublishedCoursesPageNum} from "../../../redux/reducers/MyCourseStateSlice";
import { addIcon } from "../../../utils/icons";
// import CourseDetail from "./courseDetail/CourseDetail";
import { useNavigate } from "react-router-dom";
const MyCourse = () => {
  const navigate = useNavigate();
  // const [state, setState] = useState(1);
  const dispatch = useDispatch();
  return (
    <>
      {/* {screenState === 1 ? <> */}
      <div className="myCourse-containermyCourse">
        <div className="myCourse-container">
          <div className="myCourse-container-navbar">
          <NavLink
            end
            to={""}
            className = "myCourse-navLink"
            onClick={()=>{
              dispatch(setCourseDetailDraft(false))
              dispatch(setDraftCoursesPageNum(1))
              dispatch(setPublishedCoursesPageNum(1))
              dispatch(setCourseDetailPublishedState(false))
            }}
          >
            <span>Draft&nbsp;Courses</span>
          </NavLink>

          <NavLink
            to="PublishedCourses"
            className = "myCourse-navLink"
            onClick={()=>{
              dispatch(setCourseDetailDraft(false))
              dispatch(setDraftCoursesPageNum(1))
              dispatch(setPublishedCoursesPageNum(1))
              dispatch(setCourseDetailPublishedState(false))
            }}
          >
            <span>Published&nbsp;Courses</span>
          </NavLink>
          </div>
          <button className="myCourse-addBtn" onClick={()=>{navigate("/dashBoard/MyCourses/CourseDetail")}}>
          <div className="myCourse-addBtn-icon" >{addIcon}</div>
           Add Course
          </button>
         
        </div>
   
        <div className="myCourse-body">
          <Outlet />
        </div>
      </div>
      {/* </>:<>
    </>} */}
    </>
  );
};

export default MyCourse;
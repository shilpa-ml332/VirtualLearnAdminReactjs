import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Base_Url } from "../../../../utils/baseUrl";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const updatedSuccessfully = () =>
    toast.success('Chapter added Successfully', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })

const ChapterTitleRight = () => {
    const chapterData = useSelector((state) => state.overViewData.chapterData)
    const [chapName, setChapName] = useState(null);
    console.log(chapName)
    const courseId = useSelector((state) => state.addCourseState.courseId)

    useEffect(() => {
        if (chapterData) {
            setChapName(chapterData?.chapterName?.chapterName);
        }
    }, [chapterData]);

    const submitChapter = (e) => {
        e.preventDefault();
        axios
            .request(
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                    method: 'post',
                    url: `${Base_Url}/api/v1/add_chapter`,
                    data: {
                        _id: courseId,
                        chapterName: chapName,
                    },
                },
            )
            .then((res) => {
                if (res?.status === 200)
                    updatedSuccessfully();

            })
            .catch((err) => {
                console.log(err)
                alert('Some error occured')
            })
    }

    return (

        <div className="main-container">
            <div className="DummyFileRight-date-recentcourse">
                <div className="DummyFileRight-upload-container">
                    <form onSubmit={(e) => {
                        submitChapter(e)
                    }}>
                        <div className="DummyFileRight-upload-container">
                            <div className='upload-videoTitleee ' style={{ minWidth: "400px" }}>
                                <input
                                    type="text"
                                    placeholder="Chapter Title"
                                    name="chapName"
                                    className="upload-inputField title chapName"
                                    value={chapName}
                                    onChange={(e) => {
                                        setChapName(e.target.value)
                                    }}

                                />
                            </div>
                            <div className="DummyFileRight-Save-buttonPublish">
                                <button className="QandA-ButtonEdit" id="edit">
                                    Edit
                                </button>
                                <button type="submit" className="QandA-Button" id="save">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default ChapterTitleRight

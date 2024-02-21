import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  let [courseData, setCourseData] = useState(null);
  useEffect(() => {
    console.log("Using effect.");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    if (currentUser.user.role == "instructor") {
      CourseService.get(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentUser.user.role == "student") {
      CourseService.getEnrolledCourses(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  /* !currentUser是指先登入才能看到課程清單 */
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>請先登入</p>
          <button
            onClick={handleTakeToLogin}
            className="btn btn-primary btn-lg"
          >
            點此登入
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>{currentUser.user.username}教師課程清單</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>{currentUser.user.username}學生課程清單</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div>
          <p>以下是您的課程資訊</p>
          {courseData.map((course) => (
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">課程內容：{course.description}</p>
                <p>學生人數： {course.students.length}</p>
                <p>課程價格： {course.price}元</p>
                <br />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;

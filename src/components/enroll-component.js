import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEnroll = (e) => {
    CourseService.enroll(e.target.id, currentUser.user._id)
      .then(() => {
        window.alert("Done Enrollment");
        navigate("/course");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* !currentUser是指先登入才能註冊 */
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>請先登入</p>
          <button class="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            點此登入
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>只有學生才能註冊課程</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            class="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            搜尋課程
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>以下是目前有的課程</p>
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">課程內容：{course.description}</p>
                <p>課程價格：{course.price}元</p>
                <p>學生人數： {course.students.length}</p>
                <a
                  href="#"
                  onClick={handleEnroll}
                  className="card-text"
                  class="btn btn-primary"
                  id={course._id}
                >
                  註冊
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const postCourse = () => {
    CourseService.post(title, description, price)
      .then(() => {
        window.alert("New course has been created.");
        navigate("/course");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };
  /* !currentUser是指先登入才能po新課程 */
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>請先登入</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            點此登入
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <p>Only instrcutors can post new courses.</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <label for="exampleforTitle">標題</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
          />
          <br />
          <label for="exampleforContent">課程內容</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDesciption}
          />
          <br />
          <label for="exampleforPrice">課程價格</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
          />
          <br />
          <button className="btn btn-primary" onClick={postCourse}>
            送出
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCourseComponent;

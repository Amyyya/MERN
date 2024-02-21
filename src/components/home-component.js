import React from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <main style={{ position: "relative", zIndex: 0 }}>
      <img
        src="/bgi.jpg"
        className="img-fluid"
        alt="bgi"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3" style={{ opacity: 0.9 }}>
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">線上學習平台</h1>
            <p className="col-md-8 fs-4">
              本系統使用React.js作為前端框架，以及Node.js及MongoDB作為後端伺服器。
              為MERN框架，是現今創建網頁最受歡迎的方式之一。
            </p>
            <button className="btn btn-primary btn-lg" type="button">
              開始
            </button>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div
              className="h-100 p-5 text-white bg-dark rounded-3"
              style={{ opacity: 0.9 }}
            >
              <h2>我是學生</h2>
              <p>你可以註冊喜歡的課程。</p>
              <Link to="/login">
                <button className="btn btn-outline-light" type="button">
                  註冊/登入
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="h-100 p-5 bg-light border rounded-3"
              style={{ opacity: 0.9 }}
            >
              <h2>我是教師</h2>
              <p>你可以註冊來開始製作課程。</p>
              <Link to="/login">
                <button className="btn btn-outline-secondary" type="button">
                  註冊/登入
                </button>
              </Link>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2023 Amy Lin
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;

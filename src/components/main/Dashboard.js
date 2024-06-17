import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../config/url";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// noticeBoard 정의
const NoticeBoard = ({ backendUrl }) => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${backendUrl}/board/notice`, {
          params: { cate: "notice" },
        });
        console.log("response : ", response.data);
        setNotices(response.data);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    fetchNotices();
  }, [backendUrl]);

  // 마지막의 마침표를 제거하는 함수
  const removeLastDot = (str) => {
    if (str.endsWith(".")) {
      return str.slice(0, -1); // 마지막 한 글자 제거
    }
    return str;
  };

  return (
    <div className="noticeBoard">
      <h4>공지사항</h4>
      <p>
        <Link to={`/board/list?cate=notice`}>view all</Link>
      </p>
      <table border="1">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/board/view/notice/${notice.no}`}>
                  {notice.title}
                </Link>
              </td>
              <td>{notice.nick}</td>
              <td>
                {removeLastDot(new Date(notice.rdate).toLocaleDateString())}
              </td>
              <td>{notice.hit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Dashboard 컴포넌트 정의
const Dashboard = () => {
  const location = useLocation();
  const authSlice = useSelector((state) => state.authSlice) || {};
  const navigate = useNavigate();

  const [user, setUser] = useState(
    location.state
      ? location.state.user
      : {
          uid: "",
          nick: "",
          image: "",
          email: "",
          hp: "",
        }
  );

  useEffect(() => {
    if (!authSlice.username) {
      alert("로그인 해주세요.");
      navigate("/user/login");
    } else {
      const fetchUserData = async () => {
        try {
          const res = await axios.get(
            url.backendUrl + "/main/" + authSlice.username
          );
          console.log(res.data);
          setUser(res.data);
        } catch (e) {
          console.log(e);
        }
      };

      fetchUserData();
    }
  }, [authSlice.username, navigate]);

  console.log("이거 띄워라" + JSON.stringify(user));

  return (
    <>
      {authSlice.username ? (
        <>
          <div className="Dashboard">
            <div className="top">
              <div className="profile">
                <div>
                  <img
                    src={`${url.backendUrl}/images/${authSlice.userImg}`}
                    alt="profile"
                  />
                  <ul className="userInfo">
                    <li>이름 : {user.uid}</li>
                    <li>닉네임: {user.nick}</li>
                    <li>이메일: {user.email}</li>
                    <li>전화번호: {user.hp}</li>
                  </ul>
                </div>
              </div>
            </div>
            <NoticeBoard backendUrl={url.backendUrl} />
            <div className="schedule">
              <div className="item1">
                <div>calendar</div>
              </div>
              <div className="item2">
                <div>To Do List</div>
              </div>
              {/*todo end */}
            </div>
            <h4>프로젝트</h4>
            <div className="project">
              <div>
                <div className="item1"></div>
                <div className="item2"></div>
                <div className="item3"></div>
              </div>
            </div>
          </div>
          {/*Dashboard end */}
        </>
      ) : (
        <h2>로그인 해주세요.</h2>
      )}
    </>
  );
};

export default Dashboard;

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
      <h4>Notice</h4>
      <table>
        <tbody>
          {notices.map((notice, index) => (
            <tr key={index}>
              <td className="rdate">
                {removeLastDot(new Date(notice.rdate).toLocaleDateString())}
              </td>
              <td>
                <Link to={`/board/view/notice/${notice.no}`} className="title">
                  {notice.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="viewText">
        <Link to={`/board/list?cate=notice`}>View all &nbsp;&nbsp; {">"}</Link>
      </p>
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
              <div className="profileBox">
                <p className="loginUser">Welcome, {user.uid}</p>
                <div className="profile">
                  <div className="profile_img">
                    <img
                      src={`${url.backendUrl}/images/${authSlice.userImg}`}
                      alt="profile"
                    />
                  </div>
                  <div className="info">
                    <ul className="userInfo">
                      <li>이름 : {user.uid}</li>
                      <li>닉네임: {user.nick}</li>
                      <li>이메일: {user.email}</li>
                      <li>전화번호: {user.hp}</li>
                    </ul>
                  </div>
                </div>
                {/*profile end*/}
                <p className="viewText">My profile &nbsp;&nbsp;{">"} </p>
              </div>
              {/*profileBox end */}
              <NoticeBoard backendUrl={url.backendUrl} />
            </div>
            {/*top end*/}
            <div className="bottom">
              <div className="toDoList">
                <div>toDoList</div>
              </div>
              <div className="projectBox">
                <div>프로젝트</div>
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

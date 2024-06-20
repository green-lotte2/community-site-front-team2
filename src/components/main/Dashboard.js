import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../config/url";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "./Modal"; // 모달 컴포넌트 추가


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


// projectList 정의

const ProjectList = ({ backendUrl }) => {

  const initState = {
    dtoList: [],
    cate: "",
    pg: 0,
    size: 0,
    total: 0,
    start: 0,
    end: 0,
    prev: false,
    next: false,
  };

  const [projectList, setProjectList] = useState([]);
  const authSlice = useSelector((state) => state.authSlice);
  const [serverData, setServerData] = useState(initState);


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${url.backendUrl}/project?userId=${authSlice.username}`, {
          params: { pg: "1" },
        })
        .then((resp) => {
          setServerData(resp.data);
        })
        ;
        console.log("response : ", response.data);
        setProjectList(response.data);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    fetchProject();
  }, [backendUrl]);

  return (
      <div className="projectBox">
        <div className="projectBoxTitle"><p>Project List</p></div>
        <div className="projectBoxTitleBack"></div>
          <div className="projectBoxTitleList">
            <ul>
            {serverData.dtoList.map((project, index) => (
              <div key={index}>
                <li className='projectItem' >
                <Link to={`/project/projectboard?projectNo=${project.projectNo}`}>
                      <h2>{project.projectTitle}</h2>
                      <p style={{display : 'none'}}>Project Code : {project.projectNo}</p>
                      <p>Project Content : {project.projectInfo}</p>
                      <p>Project Status : {project.projectStatus}</p>
                      <p>Created by: {project.userId}</p>
                </Link>
                </li>
              </div>
            ))}
          </ul>     
          </div>
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

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                      <li>
                        <span className="label">이름 :</span>
                        <span className="value">{user.uid}</span>
                      </li>
                      <li>
                        <span className="label">닉네임 :</span>
                        <span className="value">{user.nick}</span>
                      </li>
                      <li>
                        <span className="label">이메일 :</span>
                        <span className="value">{user.email}</span>
                      </li>
                      <li>
                        <span className="label">전화번호 :</span>
                        <span className="value">{user.hp}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/*profile end*/}
                <p className="viewText">
                  <Link to={`/user/mypage`}>My profile &nbsp;&nbsp; {">"}</Link>
                </p>
              </div>
              {/*profileBox end */}
              <NoticeBoard backendUrl={url.backendUrl} />
            </div>
            {/*top end*/}
            <div className="bottom">
              <div className="toDoList">
                <div className="taskTitle">
                  <p>Today Task</p>
                  <button onClick={openModal}>
                    <img src="../../images/plus_50.png" alt="addBtn" />
                  </button>
                </div>
                <div className="taskList">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>제목입니다</td>
                        <td>2024.06.18</td>
                      </tr>
                      <tr>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>제목입니다</td>
                        <td>2024.06.18</td>
                      </tr>
                      <tr>
                        <td>
                          <input type="checkbox"></input>
                        </td>
                        <td>제목입니다</td>
                        <td>2024.06.18</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <ProjectList backendUrl={url.backendUrl} />
              

            </div>
          </div>
          {/*Dashboard end */}
          <Modal isOpen={isModalOpen} onClose={closeModal} />{" "}
          {/* 모달 컴포넌트 추가 */}
        </>
      ) : (
        <h2>로그인 해주세요.</h2>
      )}
    </>
  );
};

export default Dashboard;

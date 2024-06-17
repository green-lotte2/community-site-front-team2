import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../config/url";
import authSlice from "../../slices/authSlice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Example = () => {
  const location = useLocation();
  const authSlice = useSelector((state) => state.authSlice) || {};

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
    axios
      .get(url.backendUrl + "/main/" + authSlice.username)
      .then((res) => {
        console.log(res.data);
        setUser({
          ...res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(user);
  }, []);

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
                    <li>이메일: {user.email} </li>
                    <li>전화번호: {user.hp} </li>
                  </ul>
                </div>
              </div>
              {/*profile end */}
              <div className="noticeBoard">
                <h4>일름보 공지사항</h4>
                <table border="1">
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>긴급공지</td>
                    <td>푸바오</td>
                    <td>2024.06.17</td>
                    <td>17</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>긴급공지</td>
                    <td>푸바오</td>
                    <td>2024.06.17</td>
                    <td>17</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>긴급공지</td>
                    <td>푸바오</td>
                    <td>2024.06.17</td>
                    <td>17</td>
                  </tr>
                </table>
              </div>
              {/*noticeBoard end */}
            </div>
            {/*top end */}
            <div className="calendarMain">
              <div>calendar</div>
            </div>
            {/*calendar end */}
          </div>
          {/* dashboard end */}
        </>
      ) : (
        <h2>로그인 해주세요.</h2>
      )}
    </>
  );
};

export default Example;

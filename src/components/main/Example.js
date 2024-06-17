import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../config/url";
import authSlice from "../../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Example = () => {
  const location = useLocation();
  const authSlice = useSelector((state) => state.authSlice) || {};
  const navigate = useNavigate();

  const [user, setUser] = useState(
    location.state
      ? location.state.user
      : {
          uid: "",
          image: "",
        }
  );

  useEffect(() => {
    if (!authSlice.username) {
      alert("로그인 해주세요.");
      navigate("/user/login");
    } else {
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
    }
  }, []);

  console.log("이거 띄워라" + JSON.stringify(user));

  return (
    <>
      <div>
        {authSlice.username ? (
          <>
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
          </>
        ) : (
          <h2>로그인 해주세요.</h2>
        )}
      </div>
    </>
  );
};

export default Example;

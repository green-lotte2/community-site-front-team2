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
          image: "",
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
      <div className="Dashboard">
        <div className="profile">
          <div>
            <img
              src={`${url.backendUrl}/images/${authSlice.userImg}`}
              alt="profile"
            />
            <ul className="userInfo">
              <li>name: 푸바오</li>
              <li>nick: 푸린세스</li>
              <li>Email: fubao@naver.com</li>
              <li>Hp:010-1234-1234</li>
            </ul>
          </div> 
        </div>
      </div>
     
    </>
  );
};

export default Example;

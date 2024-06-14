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
      <div>
        <img
          src={`${url.backendUrl}/images/${authSlice.userImg}`}
          alt="profile"
        />
      </div>
    </>
  );
};

export default Example;

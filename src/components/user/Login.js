import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    uid: "",
    pass: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/community/user/login", user)
      .then((resp) => {
        console.log(resp.data);

        // 리덕스 액션 실행
        dispatch(login(resp.data));

        // 메인 전환
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("가입된 회원이 아닙니다. 회원가입을 먼저 해주세요.");
        navigate("/user/register");
      });
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>LOGIN</h1>

      <ul className="links">
        <li>
          <a href="#" id="signin">
            SIGN IN
          </a>
        </li>
        <li>
          <a href="#" id="signup">
            SIGN UP
          </a>
        </li>
      </ul>

      <form onSubmit={submitHandler}>
        <div className="first-input input__block first-input__block">
          <input
            type="text"
            placeholder="id"
            name="uid"
            value={user.uid}
            onChange={changeHandler}
          />
        </div>
        <div className="input__block">
          <input
            type="password"
            placeholder="password"
            name="pass"
            value={user.pass}
            onChange={changeHandler}
          />
        </div>
        <input type="submit" value="Sign in" className="btnLogin" />
      </form>
      <div className="separator">
        <p>OR</p>
      </div>
      <button className="google__btn">
        <i className="fa fa-google"></i>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;

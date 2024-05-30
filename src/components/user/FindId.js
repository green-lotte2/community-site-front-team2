import React from "react";
import { Link } from "react-router-dom";

const FindId = () => {
  return (
    <div className="FindId">
      <div className="container">
        <div className="loginLogo">
          <img src="../images/logo.png" alt="" />
        </div>
        <h1>FindId</h1>

        <ul className="links">
          <li>
            <Link to="/user/login" id="signin">
              SIGN IN
            </Link>
          </li>
          <li>
            <Link to="/user/terms" id="signup">
              SIGN UP
            </Link>
          </li>
          <li>
            <Link to="/user/findid" className="findId" id="findId">
              ID
            </Link>
          </li>
          <li>
            <Link to="/user/findpw" id="findPw">
              PASSWORD
            </Link>
          </li>
        </ul>

        <form>
          <div className="first-input input__block first-input__block">
            <input
              type="text"
              placeholder="name"
              name="name"
              //value={user.uid}
              //onChange={changeHandler}
            />
          </div>
          <div className="input__block">
            <input
              type="email"
              placeholder="email"
              name="email"
              //value={user.pass}
              //onChange={changeHandler}
            />
          </div>
          <input type="submit" value="FindId" className="btnFindId" />
        </form>
      </div>
      <div className="loginImg">
        <img src="../images/login.png" alt="" />
      </div>
    </div>
  );
};

export default FindId;

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <div>
          <div className="navRight">
            <Link to="/">
              <img src="/images/alarm-40.png" alt="bell" />
            </Link>
            <Link to="/user/login">
              <img src="/images/user-40.png" alt="user" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

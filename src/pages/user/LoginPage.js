import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import "../../styles/loginstyle.scss";
import Login from "../../components/user/Login";

const LoginPage = () => {
  return (
    <DefaultLayout>
      <Login />
    </DefaultLayout>
  );
};

export default LoginPage;

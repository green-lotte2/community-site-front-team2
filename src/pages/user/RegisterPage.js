import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import "../../styles/style.scss";
import "../../styles/loginstyle.scss";
import Register from "../../components/user/Register";

const RegisterPage = () => {
  return (
    <DefaultLayout>
      <Register />
    </DefaultLayout>
  );
};

export default RegisterPage;

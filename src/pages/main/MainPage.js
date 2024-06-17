import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import "../../styles/style.scss";
import "../../styles/dashboard.scss";
import Dashboard from "../../components/main/Dashboard";

const MainPage = () => {
  return (
    <DefaultLayout>
      <Dashboard />
    </DefaultLayout>
  );
};

export default MainPage;

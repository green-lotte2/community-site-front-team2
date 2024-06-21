import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import url from "../../../../config/url"

import "./Navbar.css";

export default function Navbar(props) {


  const [isLoading, setIsLoading] = useState(true);
  const [projectTitle, setProjectTitle] = useState("");
  const authSlice = useSelector((state) => state.authSlice);
  const urlParams = new URLSearchParams(window.location.search);
  const projectNo = urlParams.get('projectNo');
  

  const loadTitle = async () => {
    setIsLoading(true); // 로딩 상태 시작
    try {
      const response = await axios.get(
        `${url.backendUrl}/project/projectTitle?projectNo=${projectNo}`,
        {
          headers: { Authorization: `Bearer ${authSlice.accessToken}` },
        }
      );
      console.log(response.data);
      setProjectTitle(response.data); // 받아온 프로젝트 제목을 상태에 설정

      setIsLoading(false); // 로딩 상태 종료
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (projectNo) {
      loadTitle();
    }
  }, [projectNo]);

  return (
    <div className="navbar">
      <h2>{projectTitle || "Project Board"}</h2>
      <div>
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          style={{ transition: "all 200ms" }}
          onChange={props.switchTheme}
        />
        <label for="checkbox" class="label">
          <i className="fas fa-moon fa-sm"></i>
          <i className="fas fa-sun fa-sm"></i>
          <div className="ball" />
        </label>
      </div>
      {/* <button>Switch theme</button> */}
    </div>
  );
}

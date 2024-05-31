import React, { useEffect, useState } from "react";
import useCates from "../../hooks/useCates";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const Modify = () => {
  const cate1 = useCates();
  const { cate, no } = useParams();
  const [board, setBoard] = useState(null);
  const authSlice = useSelector((state) => state.authSlice);

  useEffect(() => {
    console.log(`cate: ${cate}, no: ${no}`);
    axios
      .get(`http://localhost:8080/community/board/modify/${cate}/${no}`, {
        headers: { Authorization: `Bearer ${authSlice.accessToken}` },
      })

      .then((response) => {
        console.log("response data:", response.data);
        setBoard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cate, no, authSlice.accessToken]);

  return (
    <div className="Board">
      <h2>
        {/*카테고리 값에 따라 게시판 제목 변경 */}
        <span>
          {" "}
          {cate === "notice"
            ? "📌 공지사항"
            : cate === "daily"
            ? "🌞 일상"
            : cate === "report"
            ? "🚨 신고합니다"
            : "커뮤니티 글보기"}
        </span>{" "}
      </h2>
      <div className="modify">
        <div className="vTitle">
          <h3>{board.title}</h3>
          <div>
            <img src="/images/testAccount_50.png"></img>
            <div className="text">
              <p>{board.nick}</p>
              <p>{board.rdate ? board.rdate.substring(0, 10) : ""}</p>
            </div>
          </div>
        </div>
        {/*vTitle end */}
        <div className="vContent">
          <ReactQuill value={board.content} theme={"snow"} />
          <button className="reportBtn">🚨신고</button>
        </div>
        {/*vContent end */}
      </div>
      {/*view end */}
    </div>
  );
};

export default Modify;

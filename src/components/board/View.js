import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCates from "../../hooks/useCates";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import authSlice from "../../slices/authSlice";
import { useSelector } from "react-redux";
import url from "../../config/url";

const View = () => {
  const cate1 = useCates();
  // useCates의 두번째 값
  console.log("cate값:" + cate1[1]);
  const { cate, no } = useParams();
  const [board, setBoard] = useState(null);
  const authSlice = useSelector((state) => state.authSlice);

  useEffect(() => {
    console.log(`cate: ${cate}, no: ${no}`);

    axios
      .get(url.backendUrl + `/board/${cate}/${no}`, {
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

  if (!board) {
    return <div>Loading...</div>;
  }

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
      <div className="view">
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
          <ReactQuill value={board.content} readOnly={true} theme={"bubble"} />
          <button className="reportBtn">🚨신고</button>
        </div>
        {/*vContent end */}
      </div>
      {/*view end */}
      <div className="vBtn">
        <Link to={`/board/list?cate=${cate}`}>글쓰기</Link>
        <div>
          <Link to={`/board/list?cate=${cate}`}>목록</Link>
          <Link to="#">Top</Link>
        </div>
      </div>
    </div>
  );
};

export default View;

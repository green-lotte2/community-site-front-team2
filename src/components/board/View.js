import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,  useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const authSlice = useSelector((state) => state.authSlice);
  const [showModal, setShowModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleReport = () => {
    // 여기서 서버로 신고 사유를 보낼 수 있습니다.
    console.log("신고 사유:", reportReason);
    // 모달 닫기
    closeModal();
  };

  useEffect(() => {
    console.log(`cate: ${cate}, no: ${no}`);

    axios
      .get(`http://localhost:8080/community/board/view/${cate}/${no}`, {
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


  // 게시글 삭제
  const deleteHandler = async () => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (confirmed) {
      try {
        await axios.post(`http://localhost:8080/community/board/delete/${cate}/${no}`, {
          headers: { Authorization: `Bearer ${authSlice.accessToken}` },
        });
        alert('게시글이 삭제되었습니다.');
        navigate(`/board/list?cate=${cate}`); 
      } catch (error) {
        console.error('Failed to delete board:', error);
        alert('게시글 삭제에 실패하였습니다.');
      }
    }
  };


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
          <button className="reportBtn" onClick={openModal}>🚨신고</button>
                 {/* 모달 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>X</span>
            <h2>게시글 신고하기</h2>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="신고 사유를 입력하세요."
            />
            <button className="rSubmit" onClick={handleReport}>신고</button>
          </div>
        </div>
      )}{/*모달 end */}
       
        </div>
        {/*vContent end */}
      </div>
      {/*view end */}
      <div className="vBtn">
        <div>
          <Link to={`/board/write?cate=${cate}`} className="writeBtn2">글쓰기</Link>
          <Link to={`/board/modify/${cate}/${no}`}>수정</Link>
          <input type="submit" value="삭제" onClick={deleteHandler}></input>
        </div>
        <div>
          <Link to={`/board/list?cate=${cate}`} >목록</Link>
          <Link to="#" className="topBtn">Top</Link>
        </div>
      </div>
    </div>
  );
};

export default View;

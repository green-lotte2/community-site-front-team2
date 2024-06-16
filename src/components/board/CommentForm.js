import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import url from "../../config/url";

const CommentForm = ({ bno, cwriter, onSubmit }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("bno:", bno);
    console.log("content:", content);
    console.log("cwriter:", cwriter);
    console.log("accessToken:", authSlice.accessToken);

    try {
      const response = await axios.post(
        `${url.backendUrl}/comment`,
        {
          bno: bno,
          content: content,
          cwriter: cwriter,
        },
        {
          headers: {
            Authorization: `Bearer ${authSlice.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("댓글이 등록되었습니다.", response.data);
      // 부모 컴포넌트로부터 전달받은 onSubmit 콜백 함수를 호출하여 새로운 댓글을 추가합니다.
      onSubmit(response.data);
      // 입력 필드 초기화
      setContent("");
      alert("댓글이 등록되었습니다.");
    } catch (error) {
      console.error(
        "댓글 제출 중 오류 발생:",
        error.response ? error.response.data : error.message
      );
      alert("댓글 등록에 실패하였습니다.");
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="commentForm">
      <form onSubmit={handleSubmit}>
        <p>{authSlice.userNick}</p>
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="댓글을 입력하세요"
        ></textarea>
        <div className="commentBtn">
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

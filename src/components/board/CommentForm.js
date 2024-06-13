import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import url from "../../config/url";

const CommentForm = ({ bno, onSubmit }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url.backendUrl}/comment`,
        {
          bno: bno,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${authSlice.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Comment submitted:", response.data);
      // 부모 컴포넌트로부터 전달받은 onSubmit 콜백 함수를 호출하여 새로운 댓글을 추가합니다.
      onSubmit(response.data);
      // 입력 필드 초기화
      setContent("");
      alert("댓글이 등록되었습니다.");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("댓글 등록에 실패하였습니다.");
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="commentForm">
      <h4>댓글 작성</h4>
      <form onSubmit={handleSubmit}>
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

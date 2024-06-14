import React, { useEffect, useState } from "react";
import moment from "moment";
import url from "../../config/url";
import { useSelector } from "react-redux";
import axios from "axios";

const CommentList = ({ comments }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const [commentList, setCommentList] = useState(comments);

  useEffect(() => {
    setCommentList(comments); // comments props가 변경될 때 commentList 상태 업데이트
  }, [comments]); // comments가 변경될 때 useEffect 실행

  const handleDelete = async (cno) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(
          `${url.backendUrl}/comment/${cno}`,
          {
            headers: {
              Authorization: `Bearer ${authSlice.accessToken}`,
            },
          }
        );
        const updatedComments = commentList.filter(
          (comment) => comment.cno !== cno
        );
        console.log("삭제댓글", response);
        setCommentList(updatedComments);
        alert("댓글이 삭제되었습니다.");
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생:", error);
        alert("댓글 삭제에 실패하였습니다.");
      }
    }
  };

  if (comments.length === 0) {
    return <div>댓글이 없습니다.</div>; // 댓글 목록을 가져오는 중인 경우 로딩 상태 표시
  }

  return (
    <div className="commentList">
      {comments.map((comment) => (
        <div key={comment.cno} className="comment">
          <img src="/images/testAccount_50.png" alt="user" />
          <div className="contents">
            <p>{comment.nick}</p>
            <p>{comment.content}</p>
            <p className="rdate">
              {moment(comment.rdate).format("YYYY-MM-DD")}
            </p>
            <div className="commentListBtn">
              <button>수정</button>
              <button onClick={() => handleDelete(comment.cno)}>삭제</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;

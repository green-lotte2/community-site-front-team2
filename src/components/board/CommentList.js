import React, { useEffect, useState } from "react";
import moment from "moment";
import url from "../../config/url";
import { useSelector } from "react-redux";
import axios from "axios";

const CommentList = ({ comments }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const [commentList, setCommentList] = useState(comments);

  // 댓글 삭제 함수
  const handleDelete = async (cno) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        // 서버에서 댓글 삭제 요청
        await axios.delete(`${url.backendUrl}/comment/${cno}`, {
          headers: {
            Authorization: `Bearer ${authSlice.accessToken}`,
          },
        });

        // 삭제 후 상태 업데이트: 삭제된 댓글을 제외한 새로운 댓글 목록
        const updatedComments = commentList.filter(
          (comment) => comment.cno !== cno
        );
        setCommentList(updatedComments);

        // 삭제 완료 알림
        alert("댓글이 삭제되었습니다.");
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생:", error);
        alert("댓글 삭제에 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    // comments props가 변경될 때 commentList 상태 업데이트
    setCommentList(comments);
  }, [comments]); // comments가 변경될 때만 useEffect 실행

  if (comments.length === 0) {
    return <div>댓글이 없습니다.</div>;
  }

  return (
    <div className="commentList">
      {commentList.map(
        (
          comment // commentList 상태를 기준으로 렌더링
        ) => (
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
        )
      )}
    </div>
  );
};

export default CommentList;

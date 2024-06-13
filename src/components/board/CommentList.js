import React from "react";

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return <div>Loading...</div>; // 댓글 목록을 가져오는 중인 경우 로딩 상태 표시
  }

  return (
    <div className="commentList">
      {comments.map((comment) => (
        <div key={comment.cno} className="comment">
          <img src="/images/testAccount_50.png" alt="user"></img>
          <div>
            <p>{comment.nick}</p>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;

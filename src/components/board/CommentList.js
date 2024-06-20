import React, { useEffect, useState } from "react";
import moment from "moment";
import url from "../../config/url";
import { useSelector } from "react-redux";
import axios from "axios";

const CommentList = ({ comments }) => {
  const authSlice = useSelector((state) => state.authSlice);
  const [commentList, setCommentList] = useState(comments);
  const [editMode, setEditMode] = useState(null); // 수정 모드 상태 관리
  const [editedContent, setEditedContent] = useState(""); // 수정할 댓글 내용 상태 관리
  const [openReportModal, setOpenModal]= useState(false);
  const [reason, setReason] = useState("");
  const [number, setNumber]= useState("");

  const openReportModalHandler = (cno) =>{
    setNumber(cno)
    setOpenModal(true);
  }

  const closedModal = ()=>{
    setOpenModal(false);
  }

  const sendHandler = ()=>{
    if(reason === ""){
      alert('내용을 입력해 주세요.')
    }else{
      const jsonData = {cno: number , reason: reason, reporter: authSlice.username};
      axios.post(url.backendUrl+'/comment/report', jsonData)
      .then((rep)=>
        {
          alert('신고되었습니다.')
          setOpenModal(false);
        }
    )
    }
  }
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

  // 댓글 수정 모드로 변경하는 함수
  const enterEditMode = (cno, initialContent) => {
    setEditMode(cno); // 수정 모드로 변경
    setEditedContent(initialContent); // 수정할 내용 설정
  };

  // 수정 취소 함수
  const cancelEdit = () => {
    setEditMode(null); // 수정 모드 해제
    setEditedContent(""); // 수정 내용 초기화
  };

  // 댓글 업데이트 함수
  const handleUpdate = async (cno) => {
    try {
      // 서버에 수정된 댓글 내용 전송
      await axios.put(
        `${url.backendUrl}/comment/${cno}`,
        { content: editedContent },
        {
          headers: {
            Authorization: `Bearer ${authSlice.accessToken}`,
          },
        }
      );

      // 수정된 댓글을 화면에 반영하기 위해 댓글 목록을 다시 불러옴 (또는 수정된 내용으로 직접 업데이트)
      const updatedComments = commentList.map((comment) =>
        comment.cno === cno ? { ...comment, content: editedContent } : comment
      );
      setCommentList(updatedComments);

      // 수정 완료 알림
      alert("댓글이 수정되었습니다.");

      // 수정 모드 종료
      setEditMode(null);
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
      alert("댓글 수정에 실패하였습니다.");
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
      {commentList.map((comment) => (
        <div key={comment.cno} className="comment">
          <img src={`${url.backendUrl}/images/${comment.image}`} alt="user" />
          <div className="contents">
            <p>{comment.nick}</p>
            {editMode === comment.cno ? (
              // 수정 모드에서는 textarea를 보여주고 수정 취소 및 완료 버튼을 표시
              <>
                <textarea
                  className="modifyContent"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className="commentListBtn">
                  <button onClick={() => handleUpdate(comment.cno)}>
                    완료
                  </button>
                  <button onClick={cancelEdit}>취소</button>
                </div>
              </>
            ) : (
              // 수정 모드가 아닐 때는 수정 및 삭제 버튼 표시
              <>
                <p>{comment.content}</p>
                <p className="rdate">
                  {moment(comment.rdate).format("YYYY-MM-DD")}
                </p>
                <div className="commentListBtn">
                  <button className="userReport" onClick={()=>openReportModalHandler(comment.cno)}>신고</button>
                  <button
                    onClick={() => enterEditMode(comment.cno, comment.content)}
                  >
                    수정
                  </button>
                  <button onClick={() => handleDelete(comment.cno)}>
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      
      {openReportModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closedModal}>
                  X
                </span>
                <h2>댓글신고하기</h2>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="신고 사유를 입력하세요."
                />
                <button className="rSubmit" onClick={sendHandler} >
                  신고
                </button>
              </div>
            </div>
          )}
          
    </div>

    
  );
};

export default CommentList;

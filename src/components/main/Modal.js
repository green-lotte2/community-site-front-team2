import React, { useState } from "react";
import "../../styles/modal.scss";

const Modal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    // 일정 등록 로직을 여기에 추가합니다.
    console.log("제목:", title);
    console.log("날짜:", date);
    console.log("장소:", location);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>일정 등록</h2>
        <div className="modal-form">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            placeholder="날짜"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">장소 선택</option>
            <option value="work">직장</option>
            <option value="school">학교</option>
            <option value="home">집</option>
          </select>
        </div>
        <div className="modal-buttons">
          <button className="submitBtn" onClick={handleSubmit}>
            등록
          </button>
          <button className="closeBtn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCates from "../../hooks/useCates";

const View = () => {
  const cate1 = useCates();
  const { cate, no } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    console.log("cate, no 뭐야:  " + cate, no);
    axios
      .get(`http://localhost:8080/community/board/${cate}/${no}`)
      .then((response) => {
        setBoard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cate, no]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Board">
      <h2>{board.title}</h2>
      <p>작성자: {board.writer}</p>
      <p>작성일: {board.rdate}</p>
      <p>글내용: {board.content}</p>
      <div dangerouslySetInnerHTML={{ __html: board.content }} />
    </div>
  );
};

export default View;

import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <div className="Board">
      <div className="freeBoard">
        <h2>자유게시판</h2>
        <div className="select">
          <select>
            <option>전체보기</option>
            <option>공지사항</option>
            <option>일상</option>
            <option>신고합니다</option>
          </select>
        </div>
        <form>
          <div className="thead">
            <div>번호</div>
            <div>제목</div>
            <div>작성자</div>
            <div>작성일</div>
            <div>조회</div>
          </div>
          <div className="tr">
            <div className="td">1</div>
            <div className="td">신고합니다</div>
            <div className="td">홍길동</div>
            <div className="td">2024.05.24</div>
            <div className="td">17</div>
          </div>
          <div className="tr">
            <div className="td">1</div>
            <div className="td">신고합니다</div>
            <div className="td">홍길동</div>
            <div className="td">2024.05.24</div>
            <div className="td">17</div>
          </div>
          <div className="tr">
            <div className="td">1</div>
            <div className="td">신고합니다</div>
            <div className="td">홍길동</div>
            <div className="td">2024.05.24</div>
            <div className="td">17</div>
          </div>
          <div className="tr">
            <div className="td">1</div>
            <div className="td">신고합니다</div>
            <div className="td">홍길동</div>
            <div className="td">2024.05.24</div>
            <div className="td">17</div>
          </div>
          <div className="tr">
            <div className="td">1</div>
            <div className="td">신고합니다</div>
            <div className="td">홍길동</div>
            <div className="td">2024.05.24</div>
            <div className="td">17</div>
          </div>
          <div className="tr">
            <div className="td">1</div>
            <div className="td">신고합니다</div>
            <div className="td">홍길동</div>
            <div className="td">2024.05.24</div>
            <div className="td">17</div>
          </div>
        </form>
      </div>
      <div className="writeBtn">
        <Link to="#">글쓰기</Link>
      </div>
      {/*freeboard end */}
      <ul className="pagination">
        <li>
          <Link to="#">이전</Link>
        </li>
        <li>
          <Link to="#">1</Link>
        </li>
        <li>
          <Link to="#">2</Link>
        </li>
        <li>
          <Link to="#">3</Link>
        </li>
        <li>
          <Link to="#">다음</Link>
        </li>
      </ul>
    </div>
  );
};

export default List;

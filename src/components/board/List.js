import React from "react";

const List = () => {
  return (
    <>
      <div className="freeBoard">
        <h2>자유게시판</h2>
        <div className="board">
          <form className="select">
            <div>
              <select>
                <option>전체</option>
                <option>공지사항</option>
                <option>일상</option>
                <option>신고합니다</option>
              </select>
            </div>
          </form>

          <div className="table">
            <form>
              <table>
                <thead>
                  <tr className="tableTitle">
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>신고합니다</td>
                    <td>홍길동</td>
                    <td>2024.01.01</td>
                    <td>15</td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;

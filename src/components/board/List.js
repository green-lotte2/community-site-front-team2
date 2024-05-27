import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <>
    <div className="Board">
      <div className="freeBoard">
        <div className="commu_title">
          <div className="ctext">
            <h2>일름보 커뮤니티</h2>
            <p>일름보 사원들을 위한 커뮤니티 공간입니다.</p>
          </div>
          <div className="cimg">
            <img src="../images/community.png"></img>
          </div>
        </div>
        
        <div className="cate">
          <Link to="#">전체 ⩗</Link>
          <Link to="#">공지사항</Link>
          <Link to="#">일상</Link>
          <Link to="#">신고합니다</Link>
        </div>

        <div className="search">
          <div className="first_div">
            <strong>검색 키워드</strong>
            <div className="selectBox">
              <select>
                <option>제목</option>
                <option>내용</option>
                <option>제목+내용</option>
              </select>
            </div>
            <input type="text" placeholder="검색어를 입력하세요."></input>
            <button className="btn">
              <img src="../images/search-40.png"></img>
            </button>
          </div>
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
        <Link to="/board/write">글쓰기</Link>
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
    </>
  );
};

export default List;

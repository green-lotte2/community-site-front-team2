import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useCates from "../../hooks/useCates";
import { useSelector } from "react-redux";
import axios from "axios";
import Page from "./Page";

const initState = {
  dtoList: [],
  cate: "",
  pg: 0,
  size: 0,
  total: 0,
  start: 0,
  end: 0,
  prev: false,
  next: false,
};

const List = () => {
  const [cate1, cate2] = useCates();
  const authSlice = useSelector((state) => state.authSlice);
  const [searchParams] = useSearchParams();
  const pg = searchParams.get("pg") || 1;
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/board?cate=${cate2}&pg=${pg}`, {
        headers: { Authorization: `Bearer ${authSlice.accessToken}` },
      })
      .then((resp) => {
        console.log(resp.data);
        setServerData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pg]); // pg값이 변경이 되면 useEffect가 실행

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
              <img src="../images/community.png" alt="커뮤니티"></img>
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

          <div className="table">
            <div className="thead">
              <div>번호</div>
              <div>제목</div>
              <div>작성자</div>
              <div>작성일</div>
              <div>조회</div>
            </div>

            {serverData.dtoList.map((board, index) => (
              <div key={index} className="tr">
                <div className="td">{serverData.startNo - index}</div>
                <div className="td">{board.title}</div>
                <div className="td">{board.writer}</div>
                <div className="td">{board.rdate}</div>
                <div className="td">{board.hit}</div>
              </div>
            ))}
          </div>
        </div>
        {/*table end */}
        <div className="writeBtn">
          <Link to="/board/write">글쓰기</Link>
        </div>

        <Page serverData={serverData} cate1={cate1} cate2={cate2} />
        {/*freeboard end */}
      </div>
    </>
  );
};

export default List;

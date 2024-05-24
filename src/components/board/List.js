import React from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  return (
    <div className='Board'>
      <div className='boardList'>
        <h4>Board</h4>
        <header>
          <select>
            <option>전체보기</option>
            <option>공지사항</option>
            <option>일상</option>
            <option>신고합니다</option>
          </select>
        </header>

        <div>
          <section className="community">
            <div className="board">
              <table className="freeBoard">
                <thead>
                  <tr >
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>날짜</th>
                    <th>조회</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><Link to="./view.html">서면 부전시장 맛집 [3]</Link></td>
                    <td>길동이</td>
                    <td>20-05-12</td>
                    <td>12</td>
                  </tr>
                </tbody>
              </table>

              <div className="page">
                <Link to="#" className="prev">이전</Link>
                <Link to="#" className="num current">1</Link>
                <Link to="#" className="num">2</Link>
                <Link to="#" className="num">3</Link>
                <Link to="#" className="next">다음</Link>
              </div>

              <div>
                <Link to="#" className="btn btnWrite">글쓰기</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default List
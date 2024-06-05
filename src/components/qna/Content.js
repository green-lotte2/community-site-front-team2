import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import url from '../../config/url';
import Page from './Page';
import authSlice from '../../slices/authSlice';

const initState = {
    dtoList: [],
    cate: "",
    pg: 1,
    size: 10,
    total: 0,
    start: 0,
    end: 0,
    prev: false,
    next: false,
  };

const Content = () => {

  const authSlice = useSelector((state) => state.authSlice);
  const [serverData, setServerData] = useState(initState)
  //글쓰기 버튼

  const onClickHandler = (e)=>{
    e.preventDeafault();
    console.log(serverData.cate)
    if(!authSlice.username){
      alert('로그인 후 이용해주세요.')
    }else{
      window.location.href='/qna/write'
    }
  }


const location = useLocation();
const searchParams = new URLSearchParams(location.search);
var cate = searchParams.get('cate'); 
initState.cate = cate;
const pg = searchParams.get("pg") || 1;
initState.pg=pg;




//컨텐츠

useEffect(()=>{
  axios.post(`${url.backendUrl}/qnaContent`, initState).then((response)=>{
      setServerData(response.data)

  }).catch((err)=>{
      console.log(err);
  });
},[]);

useEffect(()=>{
  axios.post(`${url.backendUrl}/qnaContent`, initState).then((response)=>{
          console.log(response.data.dtoList )
          setServerData(response.data)
  }).catch((err)=>{
      console.log(err);
  });
},[cate , pg ]);

  return (
<div className="Board">
        <div className="freeBoard" >
          <div className="commu_title"  style={{backgroundColor: 'gray'}}s>
            <div className="ctext">
              <h2>고객센터 페이지</h2>
              <p>문의할 내용이 있다면 자유롭게 이용해 주세요.</p>
            </div>
            <div className="cimg">
              <img src="../images/community.png" alt="커뮤니티"></img>
            </div>
          </div>

          <div className="cate">
            <Link to="/qna?cate=qna" >QnA</Link>
            <Link to="/qna?cate=faq" >FAQ</Link>

          </div>
        <br/>
        </div>

        {initState.cate === 'qna' ?(     
          <>
            <table style={{borderTop: '1px solid gray', width: '100%', padding: '4px', overflow: 'hidden'}}>
            <thead  >
            <tr >
                <th style={{ width: '10%' }}>번호</th>
                <th style={{ width: '15%' }}>유형</th>
                <th style={{ width: '25%' }}>제목</th>
                
                <th style={{ width: '15%' }}>작성자 </th>
                <th style={{ width: '20%' }}>상태</th>
            </tr>
            </thead>
            <hr style={{width: '1000%', margin: '5px 0px', border: '1px solid 3467ffcf', marginLeft: '0px'}}/>
            <tbody style={{textAlign: 'center'}}>
       
            {serverData.dtoList.map((qna, index)=>{
                    console.log(serverData.dtoList + "왜?")
                    return(
                        <tr key={index}>
                <td style={{ width: '10%' }}>{serverData.startNo - index}</td>
                <td style={{ width: '15%' }}> {qna.cate} </td>
                <td style={{ width: '25%' }}> <Link to={'/qna/view?cate=qna&no=' + qna.qnaPk} >{qna.title}</Link>  </td>
                <td style={{ width: '15%' }}> {qna.writer}  </td>
                <td style={{ width: '15%' }}> {qna.status}  </td>
                        </tr>
                    )
                })}

                <hr style={{width: '1000%', margin: '5px 0px', border: '1px solid 3467ffcf', marginLeft: '0px'}}/>
               
            </tbody>
    
           </table>

<div className="writeBtn" >
<Link to={`/qna/write`} className="btn btnWrite" onClick={onClickHandler}>
  글쓰기
</Link>
</div>
           </>
          ):(<></>)}

<Page serverData={serverData} cate={cate} />
        </div>
        
  )
}

export default Content
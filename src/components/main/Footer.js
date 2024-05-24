import axios from "axios";
import React, { useEffect, useState } from "react";

const Footer = () => {

  const baseUrl = "//15.165.171.40:8080/community";


  //백엔드 요청
  const [ data, setData ] = useState('');

  useEffect(() => { 
        springDataSet();
    },[])

  async function springDataSet() { 
    await axios
    .get(baseUrl + "/snapshot") 
    .then((res)=>{
      	console.log(res);
        setData(res.data);
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  return (
    <>
      <footer>
        <div className="footer">
             <ul className="footerContent">
                <p>(주)일름보</p>
                <p>부산시 해운대구 반여1동</p>
                <p>대표이사 : 김준형</p>
                <p>임원진 : 조영흥, 이예나, 이승윤, 이가희</p>
                <p>SNAP-SHOT: {process.env.REACT_APP_VERSION}</p>
                <p>서버받기: {data}</p>
             </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import axios from "axios";
import React, { useEffect, useState } from "react";

const Footer = () => {

  const baseUrl = "http://localhost:8080/community";


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
        <p>(주)일름보</p>
        <div>
             <ul>
                <li>부산시 해운대구 반여1동</li>
                <li>대표이사 : 김준형</li>
                <li>SNAP-SHOT: {process.env.REACT_APP_VERSION}</li>
             </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import url from '../../config/url';
import { useStateHistory } from '@mantine/hooks';


const View = () => {

  const location = useLocation();
const searchParams = new URLSearchParams(location.search);
var cate = searchParams.get('cate'); 
const no = searchParams.get("no");

const [article , setArticle] = useState({cate:'', title:"", content:'', writer: ''});

useEffect(()=>{
axios.get(`${url.backendUrl}/lookView?cate=${cate}&no=${no}`).then((res)=>
{
  console.log(res)
  setArticle(res.data);
}) },[])



const redirectHandler = ()=>{
 window.history.back();
}


  return (

<div className="Board">
<div className="eTop">

  <div className="eTitle">
  <span style={{width: '100px', border: '1px solid gray', textAlign: 'center'}}>{article.cate}</span>  
    <input
      type="text"
      name="title"
      value={article.title}
    readOnly
    ></input>
  </div>
</div>
<br/>
<br/>

<div>
   <textarea style={{width: '100%' , minHeight: '300px', border: '1px solid lightgray', fontSize: '20px'}} 
   name="content" value={article.content} readOnly>
   </textarea>
</div>


<div className="editBtn">
  <button className="submitBtn"  onClick={redirectHandler} >
    이전
  </button>
</div>
</div>
  )
}

export default View
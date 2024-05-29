import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const ProjectCreat = () => {
  const authSlice = useSelector((state) => state.authSlice);

  // 프로젝트 제목과 유저 정보를 저장할 상태 정의
  const [projectTitle, setProjectTitle] = useState('');
  const [userList, setUserList] = useState([]); // 유저 정보 배열

  // 새로운 유저를 추가하는 함수
  const addUser = (e) => {
    // 입력된 유저 정보를 가져와서 새로운 유저 객체 생성
    const newUser = {
      name: prompt('유저 이름을 입력하세요'),
    };

    


    // 기존의 유저 리스트에 새로운 유저 추가
    setUserList([...userList, newUser]);
  }

  // 프로젝트 추가 버튼 클릭 시 실행되는 함수
  const addProject = () => {
    // 새로운 프로젝트 객체 생성
    const newProject = {
      title: projectTitle,
      users: userList // 유저 리스트도 프로젝트에 추가
    };
    
    // 기존의 프로젝트 배열에 새로운 프로젝트 추가
    // 프로젝트 추가 후에 입력 필드 초기화
    setProjectTitle([...projectTitle, newProject]);
    setProjectTitle('');
    setUserList([]);

  }

  //프로젝트 모달 스타일
  const customStyles = {
    content: {
      top: '40%',
      left: '53%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [projectInvite, setProjectInvte]= useState(false);
  return (
    <div id='ProjectList'> 
      <input
        type="text"
        placeholder="프로젝트 제목"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
      />
      <button onClick={addUser}>유저 추가</button> {/* 유저 추가 버튼 */}
      <button onClick={()=>setProjectInvte(true)}>프로젝트 추가</button>


        <Modal
        isOpen={projectInvite}
        style={customStyles}>
        <div id="content" style={{width: '400px'}}>
            {/* 유저 리스트를 화면에 출력 
            {userList.map((user, index) => (
            <div key={index}>
                <h3>프로젝트 이름 : {projectTitle}</h3>
                <h3>유저 이름: {user.name}</h3>
            </div>
              <Link to={`/projectView?projectNo`}>dddd</Link>
            ))}
            */}
            <h2>Project Create <button  style={{marginLeft: '220px', border: 'none', fontSize: '20px' , background: 'none'}} onClick={() => setProjectInvte(false) }>X</button></h2>

            <p style={{marginTop: '5px'}}>Do you want start project? then make it right now!</p>
            <br/>
            <br/>
    
            <input
        type="text"
        placeholder="project title"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
        style={{width: '300px', textAlign: 'center', height: '50px'}}
      /> <span><button type="submit" className='chatButtonp' style={{marginLeft: '30px'}} >create</button></span>
      <br/>
      <br/>
      
        </div>
            
        </Modal>


        </div>
 
  
  );
};

export default ProjectCreat;

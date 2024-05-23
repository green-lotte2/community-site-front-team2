import React from 'react';

const ChatRegister = () => {
  return (
    <div id='content'> 
    <br/>
    <br/>
    <br/>
    <div style={styles.container}>
      <h2>채팅방 만들기</h2>
      <form style={styles.form}>
      <br/>
      <br/>
        <label htmlFor="roomName">채팅방 이름:</label>
        <input type="text" id="roomName" name="roomName" style={styles.input} />
        <button type="submit" style={styles.button}>채팅방 생성</button>
      </form>
    </div>
    <br/>
    <br/>
    <br/>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '10px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '50px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '13px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ChatRegister;
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    uid: "",
    pass: "",
    name: "",
    nick: "",
    email: "",
    hp: "",
    zip: "",
    addr1: "",
    addr2: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(user);

    axios
      .post("http://localhost:8080/community/user", user)
      .then((response) => {
        console.log(response.data);
        alert("회원가입 완료!");

        navigate("/user/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="Register">
      <div className="container">
        <h1>Register</h1>

        <form onSubmit={submitHandler}>
          <div className="input_block">
            <tr>
              <td>
                <label>아이디</label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="아이디 입력"
                  className="input"
                  name="uid"
                  value={user.uid}
                  onChange={changeHandler}
                />
                <span class="resultId"></span>
              </td>
            </tr>
          </div>

          <div className="input_block">
            <tr>
              <td>
                <label>패스워드</label>
              </td>
              <td>
                <input
                  type="password"
                  placeholder="패스워드 입력"
                  className="input"
                  name="pass1"
                  value={user.pass}
                  onChange={changeHandler}
                />
              </td>
            </tr>
          </div>

          <div className="input_block">
            <tr>
              <td>
                <label>확인</label>
              </td>
              <td>
                <input
                  type="password"
                  placeholder="패스워드 확인 입력"
                  className="input"
                  name="pass2"
                  onChange={changeHandler}
                />
                <span class="resultPass"></span>
              </td>
            </tr>
          </div>

          <div className="input_block">
            <tr>
              <td>
                <label>이름</label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="이름 입력"
                  className="input"
                  name="name"
                  value={user.name}
                  onChange={changeHandler}
                />
              </td>
            </tr>
          </div>

          <div className="input_block">
            <tr>
              <td>
                <label>닉네임</label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="닉네임 입력"
                  className="input"
                  name="nick"
                  value={user.nick}
                  onChange={changeHandler}
                />
                <span class="resultNick"></span>
              </td>
            </tr>
          </div>

          <div className="input_block">
            <tr>
              <td>
                <label>이메일</label>
              </td>
              <td>
                <input
                  type="email"
                  placeholder="이메일 입력"
                  className="input"
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                />
                <span class="resultEmail"></span>
              </td>
            </tr>
          </div>

          <div className="input_block">
            <tr>
              <td>
                <label>휴대폰</label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="- 포함 13자리 입력"
                  className="input"
                  name="hp"
                  minlength="13"
                  maxlength="13"
                  value={user.hp}
                  onChange={changeHandler}
                />
                <span class="resultHp"></span>
              </td>
            </tr>
          </div>

          <div className="input_block">
            <tr>
              <td>
                <label>주소</label>
              </td>
              <td>
                <div className="zipNum">
                  <input
                    type="text"
                    placeholder="우편번호"
                    className="zip"
                    name="zip"
                    readOnly
                    value={user.zip}
                    onChange={changeHandler}
                  />
                  <button type="button" className="btnZip">
                    우편번호 찾기
                  </button>
                </div>
                <br />
                <input
                  type="text"
                  placeholder="주소를 검색하세요."
                  className="input"
                  name="addr1"
                  readOnly
                  value={user.addr1}
                  onChange={changeHandler}
                />
                <br />
                <input
                  type="text"
                  placeholder="상세주소를 입력하세요."
                  className="input"
                  name="addr2"
                  value={user.addr2}
                  onChange={changeHandler}
                />
              </td>
            </tr>
          </div>

          <input type="submit" value="Sign up" className="btnRegister" />
        </form>
      </div>
    </div>
  );
};

export default Register;

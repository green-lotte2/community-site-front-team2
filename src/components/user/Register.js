import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pass, setPass] = useState();
  const [pass2, setPass2] = useState();
  const [name, setName] = useState();
  const [nick, setNick] = useState();
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState();
  const [showEmailCode, setShowEmailCode] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [emailCodeMessage, setEmailCodeMessage] = useState("");
  const [savedCode, setSavedCode] = useState(null);

  const [user, setUser] = useState({
    uid: "",
    pass: "",
    pass2: "",
    name: "",
    nick: "",
    email: "",
    hp: "",
    zip: "",
    addr1: "",
    addr2: "",
    role: "USER",
    grade: "BASIC",
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

    const uidPattern = /^[a-zA-Z0-9_]{4,20}$/;
    if (!uidPattern.test(user.uid)) {
      setId("영문, 숫자로 4~20자까지 설정해 주세요.");
      return;
    } else {
      setId("");
    }

    const passPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passPattern.test(user.pass)) {
      setPass("영문, 숫자, 특수문자를 조합하여 8자 이상으로 설정해 주세요.");
      return;
    } else {
      setPass("");
    }
    if (user.pass !== user.pass2) {
      setPass2("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    } else {
      setPass2("");
    }

    if (!user.name) {
      setName("이름은 필수입력 사항입니다.");
      return;
    } else {
      setName("");
    }

    if (!user.nick) {
      setNick("별명은 필수입력 사항입니다.");
      return;
    } else {
      setNick("");
    }

    const emailPattern =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!emailPattern.test(user.email)) {
      setEmail("올바른 이메일 주소를 입력해주세요.");
      return;
    } else {
      setEmail("");
    }

    const hpPattern = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!hpPattern.test(user.hp)) {
      setHp("올바른 휴대폰번호 형식을 입력해주세요.");
      return;
    } else {
      setHp("");
    }
  };

  //검색버튼을 클릭하면 주소창 팝업
  const openDaumPostcode = useDaumPostcodePopup();

  //우편주소
  const handlePostcode = () => {
    openDaumPostcode({
      onComplete: (data) => {
        setUser({ ...user, zip: data.zonecode, addr1: data.address });
      },
    });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();

    if (!user.email) {
      alert("이메일을 입력하세요.");
      return;
    }

    axios
      .get(`http://localhost:8080/community/checkEmail?email=${user.email}`)
      .then((response) => {
        const result = response.data.result;
        const receivedCode = response.data.savedCode;
        setEmail(result);
        setSavedCode(receivedCode);

        if (result === "이메일 전송에 성공하였습니다.") {
          alert("이메일이 성공적으로 전송되었습니다.");
          console.log("시스템 생성 code : " + receivedCode);
          setShowEmailCode(true);
        } else {
          alert("이미 가입된 이메일 주소입니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEmailCode = (e) => {
    console.log("저장된 코드 : " + savedCode);

    e.preventDefault();

    axios
      .get(`http://localhost:8080/community/checkEmailCode`, {
        params: {
          email: user.email,
          code: emailCode,
          scode: savedCode,
        },
        withCredentials: true,
      })
      .then((response) => {
        const result = response.data.result;
        setEmailCodeMessage(result);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <td className="uid">
                <input
                  type="text"
                  placeholder="아이디 입력"
                  className="input"
                  name="uid"
                  value={user.uid}
                  onChange={changeHandler}
                />
                <span class="resultId">{id}</span>
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
                  name="pass"
                  value={user.pass}
                  onChange={changeHandler}
                />
                <span class="resultPass">{pass}</span>
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
                  placeholder="패스워드 입력 확인"
                  className="input"
                  name="pass2"
                  onChange={changeHandler}
                />
                <span class="resultPass2">{pass2}</span>
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
                <span class="resultName">{name}</span>
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
                <span class="resultNick">{nick}</span>
              </td>
            </tr>
          </div>

          <div className="input_block">
            <tr>
              <td>
                <label>이메일</label>
              </td>
              <td>
                <div className="emailNum">
                  <input
                    type="email"
                    placeholder="이메일 입력"
                    id="email"
                    className="email"
                    name="email"
                    value={user.email}
                    onChange={changeHandler}
                  />
                  <button
                    type="button"
                    className="btnEmail"
                    onClick={handleSendEmail}
                  >
                    인증
                  </button>
                </div>
                <span class="resultEmail">{email}</span>
              </td>
            </tr>
          </div>

          {showEmailCode && (
            <div className="input_block">
              <tr>
                <td>
                  <label>인증 코드</label>
                </td>
                <td>
                  <div className="emailNum">
                    <input
                      type="text"
                      placeholder="인증코드 입력"
                      className="email"
                      name="emailCode"
                      value={emailCode}
                      onChange={(e) => setEmailCode(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btnEmail"
                      onClick={handleEmailCode}
                    >
                      확인
                    </button>
                  </div>
                  <span class="resultEmailCode">{emailCodeMessage}</span>
                </td>
              </tr>
            </div>
          )}

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
                <span class="resultHp">{hp}</span>
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
                  <button
                    type="button"
                    className="btnZip"
                    onClick={handlePostcode}
                  >
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
      <div className="registerImg">
        <img src="../images/login.png" alt="" />
      </div>
    </div>
  );
};

export default Register;

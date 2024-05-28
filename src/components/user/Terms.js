import React from "react";
import { Link } from "react-router-dom";

const terms = () => {
  return (
    <div className="Terms">
      <div id="user">
        <section class="terms">
          <table>
            <caption>사이트 이용약관</caption>
            <tr>
              <td>
                <textarea readonly>약관내용</textarea>
                <p>
                  <label>
                    <input type="checkbox" name="chk1" />
                    동의합니다.
                  </label>
                </p>
              </td>
            </tr>
          </table>
          <table>
            <caption>개인정보 취급방침</caption>
            <tr>
              <td>
                <textarea readonly>개인정보 내용</textarea>
                <p>
                  <label>
                    <input type="checkbox" name="chk2" />
                    동의합니다.
                  </label>
                </p>
              </td>
            </tr>
          </table>
          <table>
            <caption>마켓팅 수신동의</caption>
            <tr>
              <td>
                <textarea readonly>개인정보 내용</textarea>
                <p>
                  <label>
                    <input type="checkbox" name="chk3" />
                    동의합니다.
                  </label>
                </p>
              </td>
            </tr>
          </table>
          <div>
            <Link to="/user/login" className="btnCancel">
              취소
            </Link>
            <Link to="/user/register" className="btnNext">
              다음
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default terms;

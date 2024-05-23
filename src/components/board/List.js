/*
import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Link } from "react-router-dom";

function EditorBox() {
  const editorRef = useRef();

  return (
    <div className="Board">
      <h1>자유게시판</h1>
      <Editor
        initialValue="내용을 입력해주세요."
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        language="ko-KR"
        ref={editorRef}
        useCommandShortcut={false}
      />
      <div className="btn">
        <Link className="cancelBtn" to="/board/list">
          취소
        </Link>
        <input className="submitBtn" type="submit" value="작성" />
      </div>
    </div>
  );
}

export default EditorBox;
*/
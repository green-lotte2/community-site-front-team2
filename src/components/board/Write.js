import React, { useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar"; // CustomToolbar 컴포넌트 import
import { Link } from "react-router-dom";

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "medium", "large", "huge"];
Quill.register(Size, true);
// 폰트를 whitelist에 추가하고 Quill에 등록해준다.
const Font = Quill.import("attributors/class/font");
Font.whitelist = ["arial", "buri", "gangwon"];
Quill.register(Font, true);

const formats = [
  "size",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "color",
  "background",
  "font",
];

/*bold , italic 추가 */
let bold = Quill.import("formats/bold");
bold.tagName = "b";
Quill.register(bold, true);

let italic = Quill.import("formats/italic");
italic.tagName = "i";
Quill.register(italic, true);

export default function Write() {
  const [values, setValues] = useState();

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar", // 커스텀 툴바의 ID
      },
    };
  }, []);

  return (
    <div className="Board">
      <h2>
        <span>oo</span> 게시판 글쓰기
      </h2>
      <div className="editor">
        <CustomToolbar /> {/* CustomToolbar 컴포넌트를 렌더링 */}
        <ReactQuill
          theme="snow"
          value={values}
          modules={modules}
          formats={formats}
          onChange={(content, delta, source, editor) =>
            setValues(editor.getHTML())
          }
        />
      </div>
      <div className="editBtn">
        <Link to="/board/list">취소</Link>
        <Link to="/board/list">완료</Link>
      </div>
    </div>
  );
}

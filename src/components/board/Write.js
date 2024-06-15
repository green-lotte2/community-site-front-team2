import React, { useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/board.scss";
import CustomToolbar from "./CustomToolbar";
import { Link, useNavigate } from "react-router-dom";
import useCates from "../../hooks/useCates";
import { useSelector } from "react-redux";
import axios from "axios";
import url from "../../config/url";

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "medium", "large", "huge"];
Quill.register(Size, true);

const Font = Quill.import("attributors/class/font");
Font.whitelist = ["buri", "GangwonEduSaeeum"];
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

let bold = Quill.import("formats/bold");
bold.tagName = "b";
Quill.register(bold, true);

let italic = Quill.import("formats/italic");
italic.tagName = "i";
Quill.register(italic, true);

// Base64 문자열을 파일로 변환하는 함수
const base64ToFile = (base64Data, fileName) => {
  const dataUrlArr = base64Data.split(",");
  const mime = dataUrlArr[0].match(/:(.*?);/)[1];
  const bstr = atob(dataUrlArr[1]); // atob : Base64 decode
  let n = bstr.length;
  console.log("mime : " + mime);
  console.log(n);
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

// 이미지 파일을 서버로 업로드하는 함수
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${url.backendUrl}/upload/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response", response.data);
    return response.data; // 서버에서 반환된 이미지 URL
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Image upload failed");
  }
};

export default function Write() {
  const cate1 = useCates();
  console.log("cate값:" + cate1[1]);

  const [values, setValues] = useState("");
  const [selectedImage, setSelectedImage] = useState(""); // 선택된 이미지의 base64 값을 저장

  const authSlice = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    cate: cate1[1],
    title: "",
    content: "",
    nick: "",
    writer: authSlice.username,
  });

  const changeHandler = (e) => {
    e.preventDefault();
    setBoard({ ...board, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setBoard({ ...board, cate: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!board.title) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!board.cate || (board.cate !== "daily" && board.cate !== "report")) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    console.log("board", board);

    const updatedBoard = { ...board, content: values };

    axios
      .post(url.backendUrl + `/board/write`, JSON.stringify(updatedBoard), {
        headers: {
          Authorization: `Bearer ${authSlice.accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        alert("글이 성공적으로 등록되었습니다!");
        console.log("resp", resp.data);
        navigate(`/board/list?cate=${updatedBoard.cate}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 이미지 선택 시 base64로 변환하여 state에 저장하고, 파일 객체로 변환한 후 서버에 업로드하는 함수
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);

      // base64 데이터를 파일 객체로 변환
      const imageFile = base64ToFile(base64Image, file.name);

      // 파일 객체를 서버로 업로드하고 URL을 반환받음
      try {
        const imageUrl = await uploadImage(imageFile);
        console.log("Uploaded Image URL:", imageUrl);

        // 반환된 URL을 img 태그로 에디터에 삽입
        setValues(
          (prevValues) =>
            prevValues + `<img src="${imageUrl}" alt="uploaded image" />`
        );
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  // 툴바의 image 버튼을 클릭하면 파일 선택 창이 열리고, 선택한 파일을 base64로 변환하여 화면에 표시하는 핸들러 추가
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar", // 커스텀 툴바의 ID
        handlers: {
          image: function () {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = () => {
              const file = input.files[0];
              handleImageChange({ target: { files: [file] } }); // 이미지 선택 후 base64 변환하여 state에 저장
              console.log("file2", file);
            };
          },
        },
      },
    };
  }, []);

  return (
    <div className="Board">
      <h2>
        {/*카테고리 값에 따라 게시판 제목 변경 */}
        <span>
          {cate1[1] === "notice"
            ? "📌 공지사항"
            : cate1[1] === "daily"
            ? "🌞 일상"
            : cate1[1] === "report"
            ? "🚨 신고합니다"
            : "커뮤니티 글쓰기"}
        </span>
      </h2>
      <div className="eTop">
        <div className="eCate">
          <select value={board.cate} onChange={handleCategoryChange}>
            <option value="" selected>
              카테고리 선택
            </option>
            <option value="daily">🌞 일상</option>
            <option value="report">🚨 신고합니다</option>
          </select>
        </div>

        <div className="eTitle">
          <input
            type="text"
            name="title"
            value={board.title}
            onChange={changeHandler}
            placeholder="제목을 입력해주세요."
          ></input>
        </div>
      </div>
      <div className="editor">
        <CustomToolbar /> {/* CustomToolbar 컴포넌트를 렌더링 */}
        <ReactQuill
          theme="snow"
          value={values}
          modules={modules}
          formats={formats}
          name="content"
          onChange={(content, delta, source, editor) =>
            setValues(editor.getHTML())
          }
        />
      </div>

      <div className="editBtn">
        <Link to={`/board/list?cate=${cate1[1]}`}>취소</Link>
        <button className="submitBtn" onClick={submitHandler}>
          등록
        </button>
      </div>
    </div>
  );
}

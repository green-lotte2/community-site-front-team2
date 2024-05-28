import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

/*
    라우팅 주소에서 cate1, cate2를 반환하는 커스텀 훅
*/

const useCates = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const paths = location.pathname.split("/");
  let cate1 = paths[2]; // 카테고리
  let cate2 = paths[3]; // 액션(list, modify, view, write)

  // 라우팅 주소가 게시판(board)이면
  if (paths[1] === "board") {
    cate1 = searchParams.get("cate1") || cate1;
  }

  return [cate1, cate2];
};

export default useCates;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { DiaryEditor } from "../components";

const Edit = () => {
  const [originDate, setOriginDate] = useState(); // 해당 id data
  const diaryList = useContext(DiaryStateContext); //data 가져오기
  const navigate = useNavigate();
  const { id } = useParams(); //현재 페이지 id

  useEffect(() => {
    if (diaryList.length >= 1) {
      // id 동일한지 체크
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setOriginDate(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id]);

  return (
    <div>
      {originDate && <DiaryEditor isEdit={true} originDate={originDate} />}
    </div>
  );
};

export default Edit;

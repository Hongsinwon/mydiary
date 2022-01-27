import React from "react";
import { useNavigate } from "react-router-dom";
import { MyButton } from ".";

// DiaryList.js : 작성 List
const DiaryItem = ({ id, emotion, time, content, date }) => {
  const navigate = useNavigate();
  const arrDayStr = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요알",
    "토요일",
  ];

  const strDate = new Date(parseInt(date));
  const dateText = `${strDate.getFullYear()}년 ${
    strDate.getMonth() + 1
  }월 ${strDate.getDate()}일`;
  const dayText = `${arrDayStr[strDate.getDay()]}`;

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const onEdit = () => {
    navigate(`/edit/${id}`);
  };

  //content.slice(0, 25)
  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="Info_wrapper">
        <div className="diary_date">
          {dateText} <span>{dayText}</span>
        </div>
        <div>{time} 작성</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div onClick={onEdit} className="btn_wrapper">
        <MyButton text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);

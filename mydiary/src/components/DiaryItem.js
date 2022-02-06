import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";
import { MyButton } from ".";

// DiaryList.js : 작성 List
const DiaryItem = ({ id, emotion, time, content, date, image }) => {
  const [dropdown, setDropdown] = useState(false);
  const btnEl = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!btnEl.current?.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.body.addEventListener("click", onClick);

    return () => {
      document.body.removeEventListener("click", onClick);
    };
  }, []);

  const navigate = useNavigate();
  const arrDayStr = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
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

  //onClick={onEdit}
  const onEdit = () => {
    navigate(`/edit/${id}`);
  };
  const { onRemove, onCreate } = useContext(DiaryDispatchContext);

  const headleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(id);
    }
    onCreate();
  };

  //content.slice(0, 25)
  return (
    <div className="ItemWrapper">
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
          <div className="diary_time">{time} 작성</div>
        </div>
        <div className="btn_wrapper" ref={btnEl}>
          <MyButton text={"💬"} onClick={() => setDropdown((cur) => !cur)} />
          {dropdown && (
            <div className="correction_delete">
              <ul>
                <li onClick={onEdit}>수정하기</li>
                <li onClick={headleRemove}>삭제하기</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div onClick={goDetail} className="diary_content">
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
        {image !== undefined && <img src={image} className="thumbNail" />}
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);

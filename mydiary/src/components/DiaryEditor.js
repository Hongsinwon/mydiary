import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { MyHeader, MyButton, EmotionItem } from "./index";
import { emotionList } from "../util/emotion";
import { DiaryDispatchContext } from "./../App.js";
import { getStringDate } from "../util/dste";

// New.js/ Edit.js : 일기 작성 / 수정
//{isEdit=true, originDate=해당 id date} =>Edit.js
const DiaryEditor = ({ isEdit, originDate }) => {
  //시간 구하기 = 오전 오후
  let Hour = new Date().getHours();
  const nowMt = new Date().getMinutes();
  const ampm = Hour >= 12 ? "오후" : "오전";
  const nowHour = Hour >= 12 ? (Hour -= 12) : Hour;
  const [time, setTime] = useState(
    `${ampm} ${nowHour}:${String(nowMt).padStart(2, "0")}`
  ); //(오후/오전) 시 : 분

  const [image, setImage] = useState(); //이미지 한장만
  const fileEl = useRef();

  const utcDate = new Date();
  const today = new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
  ).toISOString();
  const [date, setDate] = useState(today.slice(0, 10)); //년월일

  const contentRef = useRef();

  const [content, setContent] = useState(""); //일기내용
  const [emotion, setEmotion] = useState(3); //기존감정 index

  const navigate = useNavigate();

  //onCreate : 기존내용 + 추가 , onEdit : 내용수정
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    // content에 내용없을 시 focus
    if (content.length < 1) {
      return contentRef.current.focus();
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까? " : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, time, content, emotion, image);
      } else {
        setTime(`${ampm} ${nowHour}:${nowMt}`);
        onEdit(originDate.id, date, time, content, emotion, image);
      }
    }
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originDate.date))));
      setEmotion(originDate.emotion);
      setContent(originDate.content);
      setTime(`${ampm} ${nowHour}:${nowMt}`);
      setImage(originDate.image);
    }
  }, [isEdit, originDate]);

  const handleFileChange = useCallback(
    (e) => {
      const imgFile = e.target.files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgFile);
      fileReader.onload = () => {
        const newImage = fileReader.result;
        setImage(newImage);
      };
    },
    [image]
  );

  const imgUpload = () => {
    return fileEl.current.click();
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<MyButton text={"<"} onClick={() => navigate(-1)} />}
      />
      <div>
        <section className="flex_diaryeditor">
          <h4>📆 오늘은?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>

        <section>
          <h4>🙌 오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion} // 선택된 감정체크
              />
            ))}
          </div>
        </section>

        <section>
          <div className="todayDiary">
            <h4>📝 오늘의 일기</h4>
            <MyButton
              text={"📂 이미지 가져오기"}
              type={"positive"}
              onClick={imgUpload}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileEl}
            />
          </div>
          <img src={image} className="thumbNail" />
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘 기분은 어땠나요??"
              value={content}
              ref={contentRef}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
      </div>
      <div className="DiaryEditor_btn">
        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default DiaryEditor;

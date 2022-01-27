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
import { getStringDate } from "../util/dste.js";

// New.js/ Edit.js : 일기 작성 / 수정
//{isEdit=true, originDate=해당 id date} =>Edit.js
const DiaryEditor = ({ isEdit, originDate }) => {
  //시간 구하기 = 오전 오후
  let Hour = new Date().getHours();
  const nowMt = new Date().getMinutes();
  const ampm = Hour >= 12 ? "오후" : "오전";
  const nowHour = Hour >= 12 ? (Hour -= 12) : Hour;
  const [time, setTime] = useState(`${ampm} ${nowHour}:${nowMt}`);

  const [date, setDate] = useState(getStringDate(new Date()));
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3); //기존감정 index
  console.log(nowHour);

  const navigate = useNavigate();
  const contentRef = useRef(); //

  //onCreate : 기존내용 + 추가 , onEdit : 내용수정
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

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
        onCreate(date, time, content, emotion);
      } else {
        onEdit(originDate.id, date, time, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  const headleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originDate.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originDate.date))));
      setEmotion(originDate.emotion);
      setContent(originDate.content);
      setTime(`${ampm} ${nowHour}:${nowMt}`);
    }
  }, [isEdit, originDate]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={headleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
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
          <h4>오늘의 감정</h4>
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
          <h4>오늘의 일기</h4>
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
        <MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />
        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default DiaryEditor;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { MyHeader, MyButton } from "../components";
import { getStringDate } from "../util/dste.js";
import { emotionList } from "../util/emotion.js";

const Diary = () => {
  const [date, setDate] = useState();
  const diaryList = useContext(DiaryStateContext); //data 가져오기

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      //console.log(targetDiary);
      if (targetDiary) {
        setDate(targetDiary);
      } else {
        alert("존재하지 않는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!date) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionDate = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(date.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(date.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${date.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_${curEmotionDate.emotion_id}`,
              ].join(" ")}
            >
              <img src={curEmotionDate.emotion_img} />
              <div className="emotion_descript">
                {curEmotionDate.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{date.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;

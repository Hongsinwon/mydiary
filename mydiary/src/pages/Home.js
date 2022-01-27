import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { MyHeader, MyButton, DiaryList } from "../components/index";

const Home = () => {
  //DIARYLIST
  const diaryList = useContext(DiaryStateContext); //data
  const [data, setData] = useState([]); //해당월 data List

  //HEADER
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);

  // Header 월에 맞춰 해당월의 리스트에 나오기
  useEffect(() => {
    if (diaryList.length >= 1) {
      const fisrtDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23, //시
        59, //분
        59 //초
      );

      setData(
        diaryList.filter((it) => fisrtDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  // 월 이동
  const Month = (e) => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + e, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={() => Month(-1)} />}
        rightChild={<MyButton text={">"} onClick={() => Month(+1)} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;

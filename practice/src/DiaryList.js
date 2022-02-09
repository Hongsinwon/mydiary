import { useContext } from "react";
import DiaryItem from "./DiaryItem";
import { DiaryStateContext } from "./App";

const DiaryList = () => {
  const data = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <div>
        <h2>다이어리 리스트</h2>
        <p>{data.length}개의 일기가 있습니다.</p>
      </div>
      <div>
        {data.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;

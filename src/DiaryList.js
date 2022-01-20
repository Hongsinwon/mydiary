import DiaryItem from "./DiaryItem";

const DiaryList = ({ data }) => {
  return (
    <div className="DiaryList">
      <div>
        <h2>다이어리 리스트</h2>
        <p>{data.length}개의 일기가 있습니다.</p>
      </div>
      <div>
        {data.map((item, index) => (
          <DiaryItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;

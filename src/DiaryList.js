import DiaryItem from "./DiaryItem";

const DiaryList = ({ data, onRemove, onEdit }) => {
  return (
    <div className="DiaryList">
      <div>
        <h2>다이어리 리스트</h2>
        <p>{data.length}개의 일기가 있습니다.</p>
      </div>
      <div>
        {data.map((item) => (
          <DiaryItem key={item.id} {...item} onRemove={onRemove} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;

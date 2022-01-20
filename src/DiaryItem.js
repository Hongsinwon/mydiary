const DiaryItem = ({ author, emotion, content }) => {
  return (
    <div className="DiaryItem">
      <p className="info">
        작성자 : {author} | 작성감성 {emotion}
      </p>
      <div className="content">{content}</div>
    </div>
  );
};

export default DiaryItem;

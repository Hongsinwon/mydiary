import { useState, useRef } from "react";

const DiaryItem = ({ author, emotion, content, created_date, id, onRemove, onEdit }) => {
  
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content)
  const localContentInput = useRef(null)



  const handleRemove = () =>{ 
    if(window.confirm(`${id}번째 일기를 정말 삭제하기겠습니까?`)){
      onRemove(id)
  }
  }

  const handleEdit = () => {
    if(localContent.length < 5) {
      window.alert("5글자 이상이여만 수정이 가능합니다.");
      return localContentInput.current.focus();
    }

    if(window.confirm(`${id}번째의 일기를 수정하시겠습니까?`)) {
      setIsEdit(false)
      onEdit(id, localContent);
    }
  }

  const handletQuitEdit = () => {
    setIsEdit(false)
    setLocalContent(content)
  }
  
  return (
    <div className="DiaryItem">
      <div className="info">
        <p>
          작성자 : {author} | 작성감성 {emotion}
        </p>
        <span>작성시간 : {new Date(created_date).toLocaleDateString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
        <>
        <textarea 
        value={localContent} 
        ref={localContentInput}
        onChange={(e) => setLocalContent(e.target.value)} 
        />
        </>
        ) : (
        <>{localContent}</>
        )}
      </div>
      {isEdit ?(
        <button onClick={handleEdit}>수정완료</button>
      ) : (
        <button onClick={toggleIsEdit}>수정</button>
      )}
      {isEdit ?(
        <button onClick={handletQuitEdit}>취소</button>
      ) : (
        <button onClick={handleRemove}>삭제</button>
      )}
    </div>
  );
};

export default DiaryItem;

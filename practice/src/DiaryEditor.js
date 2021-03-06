import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);

  const [state, setState] = useState({ author: "", content: "", emotion: "1" });
  const authorInput = useRef(null);
  const contentTextarea = useRef(null);

  const handleChangeState = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      return authorInput.current.focus();
    }
    if (state.content.length < 5) {
      return contentTextarea.current.focus();
    }
    alert("저장 성공");
    onCreate(state);
    setState({ author: "", content: "", emotion: "1" });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          value={state.author}
          type="text"
          onChange={handleChangeState}
          ref={authorInput}
        />
      </div>
      <div>
        <textarea
          name="content"
          value={state.content}
          onChange={handleChangeState}
          ref={contentTextarea}
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);

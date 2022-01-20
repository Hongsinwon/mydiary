import React, { useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);
  const diaryData = (e) => {
    setData([...data, e]);
  };

  return (
    <div className="App">
      <DiaryEditor diaryData={diaryData} />
      <DiaryList data={data} />
    </div>
  );
}

export default App;

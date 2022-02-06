import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyButton, DiaryItem } from "./index";
import { sortOptionList, filterOptionList } from "../util/optionList";

// Home.js에서 사용
// 기능 : 상단 옵션버튼 + DiaryItem
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map(({ value, name }, idx) => (
        <option value={value} key={idx}>
          {name}
        </option>
      ))}
    </select>
  );
});

// 최신순 / 오래된순 정렬
const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest"); //시간순
  const [filter, setFilter] = useState("all"); //감정

  const getProcessedDiaryList = () => {
    //감정비교 : 3이상 : 좋은감정 / 3미만 : 나쁜감정
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // 시간 순서 비교
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.id) - parseInt(a.id);
      } else {
        return parseInt(a.id) - parseInt(b.id);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList)); // 리스트 복사
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  //ControlMenu  sortType => 시간순 / filter => 감정
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <p className="menu_diary-length">
          📚 일기
          <span> {diaryList.length}</span> 개
        </p>
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
      <div className="menu_wrapper">
        <div className="bottom_col">
          <MyButton
            type={"positive"}
            text={"새 일기작성"}
            onClick={() => navigate("/New")}
          />
        </div>
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

// Diary.js - 년 월 일
export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};


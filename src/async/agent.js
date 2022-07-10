export const getDaysData = async (calendarId, month, year) => {
  return new Promise((resolve) => {
    const numberOfDaysInMonth = getDaysInCurrentMonth(month, year);
    const emptyArray = new Array(numberOfDaysInMonth).fill({});
    const data = emptyArray.map((element, index) => {
      return {
        id: `${calendarId}_${index}_${month}_${year}`,
        date: index + 1,
        month: month,
        year: year,
        tasks: [],
      };
    });
    for (let i = 1; i <= getFillingDiff(year, month); i++) {
      data.unshift({
        id: "",
        date: "",
        month: "",
        year: "",
        tasks: [],
      });
    }
    resolve(data);
  });
};

function getDaysInCurrentMonth(month, year) {
  //const date = new Date();

  return new Date(year, month + 1, 0).getDate();
}

function getFillingDiff(year, month) {
  const d = new Date(year, month, 1);
  return d.getDay();
}

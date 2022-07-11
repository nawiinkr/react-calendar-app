export const getDaysData = async (calendarId, month, year) => {
  return new Promise((resolve) => {
    const numberOfDaysInMonth = getDaysInCurrentMonth(month, year);
    const emptyArray = new Array(numberOfDaysInMonth).fill({});
    const data = emptyArray.map((element, index) => {
      return {
        id: `${uuidv4()}`,
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
  return new Date(year, month + 1, 0).getDate();
}

function getFillingDiff(year, month) {
  const d = new Date(year, month, 1);
  return d.getDay();
}

export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

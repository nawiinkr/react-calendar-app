import { useEffect, useState } from "react";
import InnerCalendar from "./InnerCalendar";
import { getDaysData } from "../../async/agent";
import leftArrow from "../../images/leftArrow.svg";
import rightArrow from "../../images/rightArrow.svg";
import { MONTHS } from "./Constants";
function Calendar({ calendarId }) {
  if (!calendarId) {
    throw new Error("Calendar Id provided is not supported");
  }
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (currentMonth === -1) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (currentMonth === 12) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
    const fetchData = async () => {
      const data = await getDaysData(calendarId, currentMonth, currentYear);
      setDays(data);
    };
    fetchData();
  }, [currentMonth, currentYear, calendarId]);

  return (
    <div className="calendar-root">
      <span>
        <img
          style={{ width: "16px", height: "16px", cursor: "pointer" }}
          src={leftArrow}
          alt="left navigation"
          onClick={() => {
            setCurrentMonth(currentMonth - 1);
          }}
        />
        <h2
          style={{
            display: "inline-block",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          Calendar
        </h2>
        <img
          style={{ width: "16px", height: "16px", cursor: "pointer" }}
          src={rightArrow}
          alt="right navigation"
          onClick={() => {
            setCurrentMonth(currentMonth + 1);
          }}
        />
      </span>
      <div>
        <span>
          <select
            value={currentMonth}
            onChange={(event) => {
              setCurrentMonth(event.currentTarget.selectedIndex);
            }}
          >
            {MONTHS.map((month, index) => {
              return (
                <option value={index} key={`month-${index}`}>
                  {month.FULL}
                </option>
              );
            })}
          </select>
        </span>
        <input
          style={{ marginLeft: "20px" }}
          type="number"
          value={currentYear}
          onChange={(event) => {
            if (
              event.currentTarget.value < 0 ||
              event.currentTarget.value > 9999
            ) {
              //event.target.classList.add("error-border");
              event.target.value = 0;
              return;
            } else {
              //event.target.classList.remove("error-border");
            }
            setCurrentYear(event.currentTarget.value);
          }}
        ></input>
      </div>
      <InnerCalendar days={days}></InnerCalendar>
    </div>
  );
}

export default Calendar;

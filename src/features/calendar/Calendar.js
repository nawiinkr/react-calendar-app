import { useEffect, useState } from "react";
import InnerCalendar from "./InnerCalendar";
import { getDaysData } from "../../async/agent";
import { MONTHS } from "./Constants";
import Dialog from "./Dialog";
function Calendar({ calendarId }) {
  if (!calendarId) {
    throw new Error("Calendar Id provided is not supported");
  }
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);
  const [day, setDay] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
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

  useEffect(() => {
    if (!day.date) {
      return;
    }
    setDialogOpen(day.date);
    const index = days.findIndex((d) => d.id === day.id);
    if (index > -1) {
      setDays([...days.slice(0, index), day, ...days.slice(index + 1)]);
    }
  }, [day]);

  return (
    <div className="calendar-root">
      <span>
        <img
          style={{ width: "16px", height: "16px", cursor: "pointer" }}
          src="https://img.icons8.com/cotton/344/circled-chevron-left--v1.png"
          alt="left navigation"
          onClick={() => {
            setCurrentMonth(currentMonth - 1);
            setSelectedIndex(-1);
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
          src="https://img.icons8.com/cotton/344/circled-chevron-right--v1.png"
          alt="right navigation"
          onClick={() => {
            setCurrentMonth(currentMonth + 1);
            setSelectedIndex(-1);
          }}
        />
      </span>
      <div>
        <span>
          <select
            value={currentMonth}
            onChange={(event) => {
              setCurrentMonth(event.currentTarget.selectedIndex);
              setSelectedIndex(-1);
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
            setSelectedIndex(-1);
          }}
        ></input>
      </div>
      <InnerCalendar
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
        days={days}
        setDay={setDay}
      ></InnerCalendar>
      <Dialog
        setDialogOpen={setDialogOpen}
        day={day}
        open={dialogOpen}
        setDay={setDay}
      ></Dialog>
    </div>
  );
}

export default Calendar;

import { useState } from "react";
import Block from "./Block";
import "./Calendar.css";
import { weekDays } from "./Constants";
function InnerCalendar({ days, setDay }) {
  //const days = days;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div className="inner-calendar">
      {weekDays.map((weekDay, index) => {
        return (
          <div className="week-day-labels" key={`weekday-${index}`}>
            <h4 className={`${index % 7 === 0 ? "day-sunday" : ""}`}>
              {weekDay.day.substring(0, 1)}
            </h4>
          </div>
        );
      })}
      {days.map((day, index) => {
        return (
          <Block
            day={day}
            index={index}
            selectedIndex={selectedIndex}
            key={`weekday-date-${index}`}
            setSelectedIndex={setSelectedIndex}
            setDay={setDay}
          ></Block>
        );
      })}
    </div>
  );
}

export default InnerCalendar;

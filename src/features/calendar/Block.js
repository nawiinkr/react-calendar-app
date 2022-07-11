import TaskList from "./TaskList";
import { uuidv4 } from "../../async/agent";
function Block({ day, index, selectedIndex, setSelectedIndex, setDay }) {
  const blockStyle = `${day.date ? "block" : ""}`;
  const selectedBlockStyle = index === selectedIndex ? "selected-block" : "";
  const maxTasksToShow = 2;
  //const tasks = day.tasks;
  const uiTasks = Array.from(day.tasks);
  if (uiTasks.length > maxTasksToShow) {
    const diff = uiTasks.length - maxTasksToShow;
    uiTasks.splice(maxTasksToShow);
    uiTasks.push({
      text: `+${diff}`,
      taskId: `${uuidv4()}`,
    });
  }
  const onBlockPress = () => {
    setSelectedIndex(index);
    setDay(day);
  };
  return (
    <div
      className={`${selectedBlockStyle} ${blockStyle}`}
      onClick={onBlockPress}
    >
      <h4 className={`${index % 7 === 0 ? "day-sunday" : ""}`}>{day.date}</h4>
      {day.date && <TaskList tasks={uiTasks}></TaskList>}
    </div>
  );
}

export default Block;

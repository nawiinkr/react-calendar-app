import TaskList from "./TaskList";
function Block({ day, index, selectedIndex, setSelectedIndex }) {
  const blockStyle = `${day.date ? "block" : ""}`;
  const selectedBlockStyle = index === selectedIndex ? "selected-block" : "";
  const maxTasksToShow = 2;
  const tasks = [
    {
      text: "Task 1",
    },
    {
      text: "Task 1",
    },
    {
      text: "Task 1",
    },
    {
      text: "Task 1",
    },
    {
      text: "Task 1",
    },
    {
      text: "Task 1",
    },
  ];
  if (tasks.length > maxTasksToShow) {
    const diff = tasks.length - maxTasksToShow;
    tasks.splice(maxTasksToShow);
    tasks.push({
      text: `+${diff}`,
    });
  }
  const onBlockPress = () => {
    setSelectedIndex(index);
  };
  return (
    <div
      className={`${selectedBlockStyle} ${blockStyle}`}
      onClick={onBlockPress}
    >
      <h4 className={`${index % 7 === 0 ? "day-sunday" : ""}`}>{day.date}</h4>
      {day.date && <TaskList tasks={tasks}></TaskList>}
    </div>
  );
}

export default Block;

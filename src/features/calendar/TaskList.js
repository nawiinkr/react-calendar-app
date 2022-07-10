const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <span>{task.text}</span>
      ))}
    </div>
  );
};

export default TaskList;

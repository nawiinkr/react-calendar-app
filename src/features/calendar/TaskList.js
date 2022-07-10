const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks && tasks.map((task) => <span key={task.id}>{task.text}</span>)}
    </div>
  );
};

export default TaskList;

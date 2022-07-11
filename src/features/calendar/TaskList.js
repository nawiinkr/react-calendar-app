const TaskList = ({ tasks }) => {
  console.log("in tasklist");
  return (
    <div className="task-list">
      {tasks && tasks.map((task) => <span key={task.taskId}>{task.text}</span>)}
    </div>
  );
};

export default TaskList;

import Todo from "../todos/Todo";
const Dialog = ({ day, open, setDialogOpen, setDay }) => {
  const addTaskCallback = (text) => {
    day.tasks.push({
      id: `${day.id}_${day.tasks.length + 1}`,
      text: text,
    });
  };
  const deleteTaskCallback = (taskToBeDeleted) => {
    const index = day.tasks.filter((task) => {
      return task.id === taskToBeDeleted.id;
    });
    day.tasks.splice(index, 1);
  };
  return (
    <dialog open={open} style={{ position: "absolute", top: "50%" }}>
      {day.tasks && (
        <Todo
          addTaskCallback={addTaskCallback}
          deleteTaskCallback={deleteTaskCallback}
          existingTodos={day.tasks}
        ></Todo>
      )}
      <button
        onClick={() => {
          setDialogOpen(false);
          setDay({});
        }}
      >
        Close
      </button>
    </dialog>
  );
};

export default Dialog;

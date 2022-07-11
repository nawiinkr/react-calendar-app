import { useEffect, useState } from "react";
import Todo from "../todos/Todo";
import { uuidv4 } from "../../async/agent";
const Dialog = ({ day, open, setDialogOpen, setDay }) => {
  const [dialogState, setDialogState] = useState({
    isOpen: true,
    tasks: day.tasks && day.tasks.length ? [...day.tasks] : [],
  });
  const closeDialog = () => {
    setDialogOpen(false);
    setDay({});
    setDialogState({
      isOpen: false,
      tasks: [],
    });
  };
  const addTaskCallback = (text) => {
    setDialogState({
      isOpen: true,
      tasks: [
        ...day.tasks,
        {
          taskId: `${uuidv4()}`,
          text: text,
        },
      ],
    });
  };
  const deleteTaskCallback = (taskToBeDeleted) => {
    setDialogState({
      isOpen: true,
      tasks: day.tasks.filter((task) => {
        return task.taskId !== taskToBeDeleted.taskId;
      }),
    });
  };
  useEffect(() => {
    if (dialogState.isOpen) {
      setDay({
        ...day,
        tasks: [...dialogState.tasks],
      });
    }
  }, [dialogState]);

  return (
    <dialog
      open={open}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeDialog();
        }
      }}
      className="task-dialog  task-dialog-width"
    >
      {day.tasks && (
        <Todo
          addTaskCallback={addTaskCallback}
          deleteTaskCallback={deleteTaskCallback}
          existingTodos={day.tasks}
        ></Todo>
      )}
      <button
        className="dialog-close-btn"
        onClick={() => {
          closeDialog();
        }}
      >
        X
      </button>
    </dialog>
  );
};

export default Dialog;

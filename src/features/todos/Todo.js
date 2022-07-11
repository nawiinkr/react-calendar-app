import { useState, useRef, useEffect } from "react";

const Todo = ({ existingTodos, addTaskCallback, deleteTaskCallback }) => {
  const [inputText, setInputText] = useState("");
  const inputCtrlRef = useRef();
  const submitTask = () => {
    if (!inputText.trim()) {
      return;
    }
    addTaskCallback(inputText.trim());
    setInputText("");
    inputCtrlRef.current.value = "";
  };
  useEffect(() => {
    inputCtrlRef.current.focus();
  });
  return (
    <div className="dialog-todo-container">
      <span>
        <input
          className="dialog-search-input"
          ref={inputCtrlRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitTask();
            }
          }}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          placeholder="Start typing here..."
        ></input>
        <button className="dialog-add-btn" onClick={submitTask}>
          <b>+</b>
        </button>
      </span>
      <ul className="dialog-todo-list">
        {existingTodos.map((todo) => {
          return (
            <li key={todo.taskId}>
              <input type="checkbox"></input>
              <span>{todo.text}</span>
              <span style={{ float: "right" }}>
                <img
                  alt="Delete"
                  onClick={() => deleteTaskCallback(todo)}
                  src="https://img.icons8.com/ios-glyphs/344/filled-trash.png"
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                ></img>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;

import { useState, useRef, useEffect } from "react";

const Todo = ({ existingTodos, addTaskCallback, deleteTaskCallback }) => {
  const [inputText, setInputText] = useState("");
  const inputCtrlRef = useRef();
  const submitTask = () => {
    addTaskCallback(inputText);
    setInputText("");
    inputCtrlRef.current.value = "";
  };
  useEffect(() => {
    inputCtrlRef.current.focus();
  });
  return (
    <div>
      {existingTodos.map((todo) => {
        return (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <span>
              <button onClick={() => deleteTaskCallback(todo)}>Delete</button>
            </span>
          </li>
        );
      })}
      <input
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
      <button onClick={submitTask}>+</button>
    </div>
  );
};

export default Todo;

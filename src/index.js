import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import { taskComplete, titleChanged, taskDeleted } from "./store/task";

const store = configureStore();

const App = (params) => {
  const [state, setSate] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setSate(store.getState);
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(taskComplete(taskId));
  };
  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId));
  };
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`completed:${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Completed</button>
            <button onClick={() => changeTitle(el.id)}>Change Title </button>
            <button onClick={() => deleteTask(el.id)}>Delete Task </button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

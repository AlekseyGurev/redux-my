import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { initiateStore } from "./store/store";
import * as actions from "./store/actions";

const store = initiateStore();

const App = (params) => {
  const [state, setSate] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setSate(store.getState);
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(actions.taskComplete(taskId));
  };
  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
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

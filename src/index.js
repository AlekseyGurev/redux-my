import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "./store/store";
import { comleteTask, titleChanged, taskDeleted, getTasks } from "./store/task";

const store = configureStore();

const App = (params) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`completed:${el.completed}`}</p>
            <button onClick={() => dispatch(comleteTask(el.id))}>
              Completed
            </button>
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getErrors } from "./store/errors";
import configureStore from "./store/store";
import {
  comleteTask,
  titleChanged,
  taskDeleted,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  addTask,
} from "./store/task";

const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };
  const createtTask = () => {
    dispatch(addTask());
  };
  if (isLoading) {
    return <h2>... Loading</h2>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <h1>App</h1>
      <button onClick={() => createtTask()}>Add Task</button>
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

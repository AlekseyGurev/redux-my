import * as actionTypes from "./actionTypes";

export function taskComplete(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id, completed: true },
  };
}

export function titleChanged(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id, title: `New title for ${id}` },
  };
}

import React, { useState } from 'react';
import { API } from '../../api';

const Task = (props) => { 
  
  const [localInputValue, setLocalInputValue] = useState(props.element.input);
  const [editMode, setEditMode] = useState(false);
  const deleteNotification = () => props.toast.error((localInputValue.trim()) ? `Task "${localInputValue}" deleted"` : "Empty task deleted", props.toastInf);
  const taskChangeNotification = () => props.toast.info(`Task changed!`, props.toastInf);
  const checkNotification = (value) => props.toast.success(`Task "${localInputValue}" marked as ${value}!"`, props.toastInf);
  const deleteTask = (id) => {
    async function fetch() {
      let response = await API.deleteTask(id);
      if (response.statusText === "OK") {
        props.setTasks((arr) => arr.filter((obj) => (
          obj._id !== id
        )));
        deleteNotification();
      }
    }
    fetch();
  };
  const onNewInputValue = (id) => {
    setEditMode(false);
    if (!localInputValue.trim()) {
      deleteTask(id);
    } else if (localInputValue.trim() !== props.element.input) {
      async function fetch() {
        let response = await API.updateTask(id, localInputValue.trim(), props.element.checked);
        if (response.statusText === "OK") {
          props.setTasks((arr) => arr.map((obj) => {
            if (obj._id === id) {
              return ({ ...obj, input: localInputValue.trim() });
            }
            else {
              return obj;
            }
          }));
          taskChangeNotification();
        }
      }
      fetch();
    }
    setLocalInputValue(localInputValue.trim());
  };
  const checkTask = (id) => {
    async function fetch() {
      let response = await API.updateTask(id, localInputValue.trim(), !props.element.checked);

      if (response.statusText === "OK") {

        props.setTasks((arr) => arr.map(obj => { //берет каждый элемент массива(каждый объект)
          if (obj._id === id) { //если id объекта равен id элемента  
            let value = obj.checked;
            return ({ ...obj, checked: !value })
          }
          else { //все остальные объекты
            return obj;
          }
        }));
        checkNotification((props.element.checked) ? "not done" : "done");
      }
    }
    fetch();
  };
  const defineKey = (e) => {
    if (e.charCode === 13) onNewInputValue(props.element._id);
  };
  return (
    <div className="task">
      <div className="task-checkbox" onClick={() => checkTask(props.element._id)}>
        <div className={(props.element.checked) ? "check-cirlcle-active" : "check-cirlcle"}>
          <div className={(props.element.checked) ? "check-mark-active" : null}></div>
        </div>
      </div>
      {(editMode) ?
        <input
          autoFocus={true}
          onInput={(e) => setLocalInputValue(e.target.value)}
          onBlur={() => onNewInputValue(props.element._id)}
          onKeyPress={(e) => defineKey(e)}
          value={localInputValue}
          className={(props.element.checked) ? "task-input-done" : "task-input"} /> :
        <div onDoubleClick={() => setEditMode(true)}
          className={(props.element.checked) ? "task-input-done" : "task-input"}> {localInputValue}</div>}
      <button className="task-delete" onClick={() => deleteTask(props.element._id)}><div className="delete-symb">+</div></button>
    </div>);
}
export default Task;

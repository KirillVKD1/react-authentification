import React, { useState } from 'react';

const Task = (props) => {
  debugger

  const [localInputValue, setLocalInputValue] = useState(props.element.input);
  const [editMode, setEditMode] = useState(false);
  //NOTIFICATION 
  const deleteNotification = () => props.toast.error((localInputValue.trim()) ? `Task "${localInputValue}" deleted"` : "Empty task deleted", props.toastInf);
  const editModeNotification = (value) => props.toast.info(`Task changed!`, props.toastInf);
  const checkNotification = (value) => props.toast.success(`Task "${localInputValue}" marked as ${value}!"`, props.toastInf); 


  const deleteTask = (id) => {
    props.setTasks((arr) => arr.filter(e => (
      e.id !== id
    )));
    deleteNotification()
  };

  const doubleClickInput = () => {
    setEditMode(true);
  };

  const onInputNewValue = (id) => {
    setEditMode(false); 
    if (!localInputValue.trim()) {
      deleteTask(id);
    } else if (localInputValue.trim() !== props.element.input) {
      editModeNotification(); 

      props.setTasks((arr) => arr.map((e) => { 
        if (e.id === id) {
          return ({ ...e, input: localInputValue.trim() });
        }
        else {
          return e;
        }
    }));
    }  
    
    
    setLocalInputValue(localInputValue.trim());
  };

  const checkTask = (id) => {
    props.setTasks((arr) => arr.map(e => { //берет каждый элемент массива(каждый объект)
      if (e.id === id) { //если id объекта равен id элемента  
        let value = e.checked;
        return ({ ...e, checked: !value })
      }
      else { //все остальные объекты
        return e;
      }
    }));
    checkNotification((props.element.checked) ? "not done" : "done");
  };

  const defineKey = (e) => {
    if (e.charCode === 13) onInputNewValue(props.element.id);
  };

  return (
    <div className="task">
      <div className="task-checkbox" onClick={() => checkTask(props.element.id)}>
        <div className={(props.element.checked) ? "check-cirlcle-active" : "check-cirlcle"}>
          <div className={(props.element.checked) ? "check-mark-active" : null}></div>
        </div>
      </div>
      {(editMode) ?
        <input
          autoFocus={true}
          onInput={(e) => setLocalInputValue(e.target.value)}
          onBlur={() => onInputNewValue(props.element.id)}
          onKeyPress={(e) => defineKey(e)}
          value={localInputValue}
          className={(props.element.checked) ? "task-input-done" : "task-input"} /> :
        <div onDoubleClick={() => doubleClickInput()}
          className={(props.element.checked) ? "task-input-done" : "task-input"}> {localInputValue}</div>}
      <button className="task-delete" onClick={() => deleteTask(props.element.id)}><div className="delete-symb">+</div></button>
    </div>);
}

export default Task;

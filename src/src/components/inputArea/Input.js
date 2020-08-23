import React, { useState } from 'react';

const Input = (props) => {

  const addNotification = () => props.toast.success(`Task "${inputValue}" added!`, props.toastInf);//NOTIFICATION 
  const checkAllTasks = (value) => props.toast.info(`All tasks marked as ${value}!`, props.toastInf);

  const [inputValue, setInputValue] = useState('');
  const [idValue, setIdValue] = useState(0);

  const addTask = (e) => {debugger

    if (inputValue.trim().length) {
      let newObjTask = { id: idValue, input: inputValue.trim(), checked: false };
      props.setTasks((arr) => [...arr, newObjTask]);
      setIdValue(idValue + 1);
      setInputValue("");
      addNotification();
    } else {
      setInputValue("");
    }
  }; 
  const onBlurClean=()=>{ 
    setInputValue("")
  }

  const checkAll = () => {
    (props.toggleAllValue) ? props.setToggleAll(false) : props.setToggleAll(true);
    (props.toggleAllValue) ? checkAllTasks("not done") : checkAllTasks("done");
    let value = (props.toggleAllValue) ? false : true;

    props.setTasks((arr) => arr.map((e) => ({ ...e, checked: value })));
  };

  const defineKey = (e) => {
    if (e.charCode === 13) addTask(e);
  };
  props.isAllTasksDone();

  return (
    <>
      <div className="input-area">
      {(props.tasksArr.length) ?<div className="check-all" onClick={() => checkAll()}>
          <>
            <div className={(props.toggleAllValue) ? "chek-symb-first-active" : "chek-symb-first"}  ></div>
            <div className={(props.toggleAllValue) ? "chek-symb-second-active" : "chek-symb-second"} ></div></>
        </div> : <div className="check-all"></div>}
        <input className="task-create-input" onBlur={(e) => setTimeout(onBlurClean,200)} onKeyPress={(e) => defineKey(e)} onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="What needs to be done?" />
        <button onClick={(e) => addTask(e)} className="task-add">Add</button>
      </div>
    </>);
};

export default Input;

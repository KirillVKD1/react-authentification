import React, { useState } from 'react';
import { API } from '../../api';

const Input = (props) => {

  const addNotification = () => props.toast.success(`Task "${inputValue}" added!`, props.toastInf);//NOTIFICATION 
  const checkAllTasks = (value) => props.toast.info(`All tasks marked as ${value}!`, props.toastInf);

  const [inputValue, setInputValue] = useState('');


  const addTask = (e) => {////////////////////////

    if (inputValue.trim().length) {

      async function fetch() {

        let response = await API.postTask(inputValue.trim());

        if (response.statusText === "OK") {

          let newObjTask = { _id: response.data._id, input: inputValue.trim(), checked: false };

          props.setTasks((arr) => [...arr, newObjTask]);

          setInputValue("");
          addNotification();
        } else {
          setInputValue("");
        }
      }
      fetch();
    }
  };

  const onBlurClean = () => {
    setInputValue("")
  }

  const checkAllServer = (condition) => {
    if (condition) {
      async function fetch() {
        let response = await API.checkAll(true);
        if (response.statusText === "OK") {
          props.setToggleAll(true);
        }
      }
      fetch();
    } else {
      async function fetch() {
        let response = await API.checkAll(false);
        if (response.statusText === "OK") {
          props.setToggleAll(false);
        }
      }
      fetch();
    }
  }


  const checkAll = () => {
    (props.toggleAllValue) ? checkAllServer(false) : checkAllServer(true);
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
        {(props.tasksArr.length) ? <div className="check-all" onClick={() => checkAll()}>
          <>
            <div className={(props.toggleAllValue) ? "chek-symb-first-active" : "chek-symb-first"}  ></div>
            <div className={(props.toggleAllValue) ? "chek-symb-second-active" : "chek-symb-second"} ></div></>
        </div> : <div className="check-all"></div>}
        <input className="task-create-input" onBlur={(e) => setTimeout(onBlurClean, 200)} onKeyPress={(e) => defineKey(e)} onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="What needs to be done?" />
        <button onClick={(e) => addTask(e)} className="task-add">Add</button>
      </div>
    </>);
};

export default Input;

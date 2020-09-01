import React, { useState, useContext } from 'react';
import { API } from '../../api';
import { AuthContext } from '../Context/AuthContext';

const Input = (props) => {

  const addNotification = () => props.toast.success(`Task "${inputValue}" added!`, props.toastInf);//NOTIFICATION 
  const checkAllNotification = (value) => props.toast.info(`All tasks marked as ${value}!`, props.toastInf);
  const [inputValue, setInputValue] = useState('');
  const auth = useContext(AuthContext);
  const addTask = async (e) => {
    debugger
    if (inputValue.trim().length) {

      const response = await API.postTask(inputValue.trim());  
      

      let newObjTask = { _id: response.data._id, input: inputValue.trim(), checked: false };
      props.setTasks((arr) => [...arr, newObjTask]);

      //setInputValue("");
      addNotification();
      // } else {
      //   setInputValue("");
      //  }
    }
  };
  const checkAllTasks = (value) => {
    async function fetch() {
      let response = await API.checkAll(value);
      if (response.statusText === "OK") {
        props.setToggleAll(value);
      }
    }
    fetch();
  };
  const checkAllCondition = () => {
    (props.toggleAllValue) ? checkAllTasks(false) : checkAllTasks(true);
    (props.toggleAllValue) ? checkAllNotification("not done") : checkAllNotification("done");
    let value = props.toggleAllValue;
    props.setTasks((arr) => arr.map((obj) => ({ ...obj, checked: !value })));
  };
  return (
    <>
      <div className="input-area">
        <button onClick={() => auth.logout()}>LOGOUT</button>
        {(props.tasksArr.length) ? <div className="check-all" onClick={() => checkAllCondition()}>
          <><div className={(props.toggleAllValue) ? "chek-symb-first-active" : "chek-symb-first"}  ></div>
            <div className={(props.toggleAllValue) ? "chek-symb-second-active" : "chek-symb-second"} ></div></>
        </div> : <div className="check-all"></div>}
        <input className="task-create-input" onBlur={(e) => setTimeout(() => setInputValue(""), 200)} onKeyPress={(e) => (e.charCode === 13) ? addTask(e) : null} onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="What needs to be done?" />
        <button onClick={(e) => addTask(e)} className="task-add">Add</button>
      </div>
    </>);
};
export default Input;

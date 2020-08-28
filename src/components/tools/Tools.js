import React from 'react';
import { API } from '../../api';

const Tools = (props) => { 
  
  const clearDoneTasksNotification = (value) => props.toast.info(value, props.toastInf);
  let tasksArrClone = props.tasksArr.slice();//slice без аргументов создает поверхностную копию массива.    
  let checkedTasksLength = tasksArrClone.filter(e => (!e.checked)).length;
  const clearCompleted = () => {
    async function fetch() {
      let response = await API.deleteAll();
      if (response.statusText === "OK") {
        props.setTasks((arr) => arr.filter(obj => (
          obj.checked === false))
        );
        clearDoneTasksNotification("All completed tasks deleted!");
      }
    }
    fetch();
  };
  return (
    <div className="tools">
      <div className="counter">
        <div> {(checkedTasksLength > 1) ? `${checkedTasksLength} items left` : `${checkedTasksLength} item left`}</div>
      </div>
      <div className="filters">
        <div onClick={() => props.setFilter("all")} className={(props.filterValue === "all") ? "border-filter" : null} >All</div>
        <div onClick={() => props.setFilter(false)} className={(props.filterValue === false) ? "border-filter" : null} > Active</div>
        <div onClick={() => props.setFilter(true)} className={(props.filterValue === true) ? "border-filter" : null} > Completed</div>
      </div>
      {(checkedTasksLength !== props.tasksArr.length) ?
        <div className="clear-completed">
          <div onClick={() => clearCompleted()}>Clear completed </div>
        </div> : <div className="clear-completed"></div>}
    </div>
  );
}

export default Tools;

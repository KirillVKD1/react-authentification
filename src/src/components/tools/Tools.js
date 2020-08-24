import React from 'react';

const Tools = (props) => {
  

  const clearDoneTasksNotification = (value) => props.toast.info(value, props.toastInf);
  let tasksArrClone = props.tasksArr.slice();//slice без аргументов создает поверхностную копию массива.    

  let tasksLength = tasksArrClone.filter(e => (
    !e.checked));

  const clearCompleted = () => {
    props.setTasks((arr) => arr.filter(e => (
      e.checked === false))
    );
    if (tasksLength === props.tasksArr.length) {
      clearDoneTasksNotification("No completed tasks!");
    } else {
      clearDoneTasksNotification("All completed tasks deleted!");
    }
  };

  return (
    <div className="tools">
      <div className="counter">
        <div> {(tasksLength.length > 1) ? `${tasksLength.length} items left` : `${tasksLength.length} item left`}</div>
      </div>
      <div className="filters">
        <div onClick={() => props.setFilter("all")} className={(props.filterValue === "all") ? "border-filter" : null} >All</div>
        <div onClick={() => props.setFilter(false)} className={(props.filterValue === false) ? "border-filter" : null} > Active</div>
        <div onClick={() => props.setFilter(true)} className={(props.filterValue === true) ? "border-filter" : null} > Completed</div>
      </div>
      {(tasksLength.length !== props.tasksArr.length) ?
        <div className="clear-completed">
          <div onClick={() => clearCompleted()}>Clear completed </div>
        </div> : <div className="clear-completed"></div>}

    </div>

  );
}

export default Tools;

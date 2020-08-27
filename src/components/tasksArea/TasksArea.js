import React from 'react';
import Task from './Task';

const TasksArea = (props) => {

  return (
    <div className="tasks-area">
      {props.tasksArr.map(element => {
        if (props.filterValue === "all") {
          return <Task
            key={element._id}
            element={element}
            setTasks={props.setTasks}
            toast={props.toast}
            toastInf={props.toastInf} 
            isAllTasksDone={props.isAllTasksDone} />
        }
        else {
          return (element.checked === props.filterValue) ? <Task
            key={element._id}
            element={element}
            setTasks={props.setTasks}
            toast={props.toast}
            toastInf={props.toastInf} 
            isAllTasksDone={props.isAllTasksDone} /> : null;
        }
      }
      )}
    </div>)
};

export default TasksArea;

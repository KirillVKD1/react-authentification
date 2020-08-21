import React, { useState } from 'react';
import './App.css';
import Input from './components/inputArea/Input.js';
import TasksArea from './components/tasksArea/TasksArea.js';
import Tools from './components/tools/Tools.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [tasksArr, setTasks] = useState([]);
  const [toggleAllValue, setToggleAll] = useState(false);
  const [filterValue, setFilter] = useState("all");

  const toastInf = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const isAllTasksDone = () => {
    debugger

    if (tasksArr.some((e) => e.checked !== true)) {
      setToggleAll(false)
    }
    else if (tasksArr.length) {
      setToggleAll(true);
    } 
  };


  return (
    <div className="bg">
      <div className="container">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"></link>
        <div className="tittle-div"><p>todos</p></div>
        <div className="background">

          <Input
            setTasks={setTasks}
            tasksArr={tasksArr}
            toggleAllValue={toggleAllValue}
            setToggleAll={setToggleAll}
            toast={toast}
            toastInf={toastInf}
            isAllTasksDone={isAllTasksDone}
          />

          <TasksArea
            setTasks={setTasks}
            tasksArr={tasksArr}
            filterValue={filterValue}
            toast={toast}
            toastInf={toastInf}
            isAllTasksDone={isAllTasksDone}
          />
          {(tasksArr.length) ?

            <Tools
              setTasks={setTasks}
              tasksArr={tasksArr}
              setFilter={setFilter}
              filterValue={filterValue}
              toast={toast}
              toastInf={toastInf}

            /> : null}

        </div>
        {(tasksArr.length) ? <><div className="shadowDiv"></div><div className="shadowDivLast"></div></> : null}
        <ToastContainer />
      </div>
    </div>
  )
}

export default App;
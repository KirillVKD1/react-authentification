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
    if (tasksArr.some((e) => e.checked !== true)) {
      setToggleAll(false)
    }
    else if (tasksArr.length) {
      setToggleAll(true);
    }
  };

  return (
    <div className="bg">

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

  )
}

export default App;
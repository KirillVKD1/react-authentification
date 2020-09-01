import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Input from './components/inputArea/Input.js';
import TasksArea from './components/tasksArea/TasksArea.js';
import Tools from './components/tools/Tools.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from './api';
import { useAuth } from './components/Auth/auth';
import { AuthContext } from './components/Context/AuthContext';

const App = () => {
  debugger

  const { token, login, logout, userId } = useAuth();
  const isAuth = !!token;//became boolean
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

  useEffect(() => {
    async function fetch() {debugger
      let response = await API.getTasks();
      setTasks(response.data.map((obj) => obj));
    }
    fetch();

  }, {});// componentDidMount 

  useEffect(() => {
    if (tasksArr.some((e) => e.checked !== true)) {
      setToggleAll(false);
    }
    else if (tasksArr.length) {
      setToggleAll(true);
    }
  }, [tasksArr]);

  if (!isAuth) {
    return (
      <>
        <AuthContext.Provider
          value={{ token, login, logout, userId, isAuth }}>
          <Login
            toast={toast}
            toastInf={toastInf} />
          <ToastContainer />
        </AuthContext.Provider>
      </>
    )
  } else {
    return (
      <AuthContext.Provider value={{ token, login, logout, userId, isAuth }}>
        < div className="bg" >
          <div className="tittle-div"><p>todos</p></div>
          <div className="background">

            <Input
              token={token}
              setTasks={setTasks}
              tasksArr={tasksArr}
              toggleAllValue={toggleAllValue}
              setToggleAll={setToggleAll}
              toast={toast}
              toastInf={toastInf}
            />
            <TasksArea
              setTasks={setTasks}
              tasksArr={tasksArr}
              filterValue={filterValue}
              toast={toast}
              toastInf={toastInf}
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
        </div >
      </AuthContext.Provider>
    )
  }

}

export default App;
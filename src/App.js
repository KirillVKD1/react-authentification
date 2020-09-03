import React, { useState, useEffect } from 'react';
import './App.css';
import AuthPage from './components/AuthPage/AuthPage';
import Input from './components/inputArea/Input.js';
import TasksArea from './components/tasksArea/TasksArea.js';
import Tools from './components/tools/Tools.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from './api';
import { useAuth } from './components/Auth/auth';
import { AuthContext } from './components/Context/AuthContext';

const App = () => {

  const { token, login, logout, userId, userEmail } = useAuth();
  const isAuth = !!token;//!! boolean   
  console.log(`111111111${token}`)

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
  const onChangeTasks = async () => {
    let response = await API.getTasks();
    setTasks(response.data.map((obj) => obj));
  };

  useEffect(() => {
    onChangeTasks();

  }, []);// componentDidMount 

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
          < div className="bg" >
            <div className="tittle-div"><p>todos</p></div>
            <div className="background">
              <AuthPage
                onChangeTasks={onChangeTasks}
                toast={toast}
                toastInf={toastInf}
              />

              <ToastContainer />
            </ div>
          </ div>

        </AuthContext.Provider >
      </>
    )
  } else {
    return (
      <AuthContext.Provider value={{ token, login, logout, userId, isAuth, userEmail }}>
        < div className="bg" >
          <div className="tittle-div"><p>todos</p></div>
          <div className="background">

            <Input
              onChangeTasks={onChangeTasks}
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
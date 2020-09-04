import * as axios from 'axios';

const token = (window.localStorage.getItem('userData')) ? JSON.parse(window.localStorage.getItem('userData')).token : "no token";

const instance = axios.create({ //axios.create sam vstraivaet vse nastroiki dla zaprosa na server, kotorie vpishem!!!

    baseURL: 'http://localhost:3010/api/tasks',//bwithCredentials: true, //authorized = true    
    headers: { 'authorization': token },

});

const instanceAuth = axios.create({ //axios.create sam vstraivaet vse nastroiki dla zaprosa na server, kotorie vpishem!!!
    baseURL: 'http://localhost:3010/api/users/auth',//bwithCredentials: true, //authorized = true    

});

export const API = {

    singUp(email, password) {
        return instanceAuth.post("/signUp", { email: email, password: password })
            .then(response => {
                return response;
            });
    },
    login(email, password) {
        return instanceAuth.post("/login", { email: email, password: password })
            .then(response => {
                return response;
            });
    },
    getTasks(token1) {
        return instance.get("/")// { 'authorization': token1 }
            .then(response => {
                return response;
            });
    },
    createTask(input) {
        return instance.post("/", { input: input })
            .then(response => {
                return response;
            });
    },
    updateTask(id, input, checked) {
        return instance.put("/", { id: id, input: input, checked: checked })
            .then(response => {
                return response;
            });
    },
    checkTasks(value) {
        return instance.put("/check-all/", { checked: value })
            .then(response => {
                return response;
            });
    },
    deleteTask(id) {
        return instance.delete(`${id}`)
            .then(response => {
                return response;
            });
    },
    deleteAll() {
        return instance.delete("/")
            .then(response => {
                return response;
            });
    },
};



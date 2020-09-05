import * as axios from 'axios';

const token = (window.localStorage.getItem('userData')) ? JSON.parse(window.localStorage.getItem('userData')).token : "no token";
console.log(`$@@@@@@@@@@@@@@${token}`)

const instance = axios.create({ //axios.create sam vstraivaet vse nastroiki dla zaprosa na server, kotorie vpishem!!!

    baseURL: 'http://localhost:3010/api/posts',//bwithCredentials: true, //authorized = true    
    headers: { 'authorization': token },

});

const instanceAuth = axios.create({ //axios.create sam vstraivaet vse nastroiki dla zaprosa na server, kotorie vpishem!!!
    baseURL: 'http://localhost:3010/api',//bwithCredentials: true, //authorized = true    

});

export const API = {

    singUpPost(email, password) {
        return instanceAuth.post("/register", { email: email, password: password })
            .then(response => {
                return response;
            });
    },
    authMe(email, password) {
        return instanceAuth.post("/login", { email: email, password: password })
            .then(response => {
                return response;
            });
    },
    getTasks(token1) {
        return instance.get("/", { 'authorization': token1 })
            .then(response => {
                return response;
            });
    },
    createTask(input) {
        return instance.post("/create", { input: input })
            .then(response => {
                return response;
            });
    },
    updateTask(id, input, checked) {
        return instance.post("/update", { id: id, input: input, checked: checked })
            .then(response => {
                return response;
            });
    },
    checkAll(value) {
        return instance.put("/all/checked/", { checked: value })
            .then(response => {
                return response;
            });
    },
    deleteTask(id) {
        return instance.post(`/${id}/deleted/`)
            .then(response => {
                return response;
            });
    },
    deleteAll() {
        return instance.put("/all/deleted")
            .then(response => {
                return response;
            });
    },
};



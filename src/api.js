import * as axios from 'axios';

const instance = axios.create({ //axios.create sam vstraivaet vse nastroiki dla zaprosa na server, kotorie vpishem!!!
    baseURL: 'http://localhost:3001/api/posts',//bwithCredentials: true, //authorized = true  

});


export const API = {

    getTasks() {
        return instance.get("/")
            .then(response => {
                return response;
            });
    },
    deleteTask(id) {
        return instance.post(`/${id}`)
            .then(response => {
                return response;
            });
    },
    postTask(input) {
        return instance.post("/", { input: input })//CREATE//UPDATE
            .then(response => {
                return response;
            });
    },
    updateTask(id, input, checked) {
        return instance.post("/", { id: id, input: input, checked: checked })//CREATE//UPDATE
            .then(response => {
                return response;
            });
    },
    checkAll(value) {
        return instance.put("/", { checked: value })
            .then(response => {
                return response;
            });
    },
    deleteAll() {
        return instance.put("/delete/")
            .then(response => {
                return response;
            });
    },
};



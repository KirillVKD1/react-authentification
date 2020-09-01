import * as axios from 'axios';

const token = JSON.parse(window.localStorage.getItem('userData')).token; 
alert(token)
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjRkMjMzYjQ5NTA0ODMwMmUzNWU0ZTAiLCJpYXQiOjE1OTg5NTE5NTYsImV4cCI6MTU5ODk1NTU1Nn0.vWs_IqWDXk3kfpWfdPet5P9Fr1Vanzi00F_HyrlnrKM";
const instance = axios.create({ //axios.create sam vstraivaet vse nastroiki dla zaprosa na server, kotorie vpishem!!!

    baseURL: 'http://localhost:3010/api/posts',//bwithCredentials: true, //authorized = true    
    headers: { 'authorization': token },


});

const instance2 = axios.create({ //axios.create sam vstraivaet vse nastroiki dla zaprosa na server, kotorie vpishem!!!
    baseURL: 'http://localhost:3010/api',//bwithCredentials: true, //authorized = true    

});

export const API = {


    singUpPost(email, password) {
        return instance2.post("/register", { email: email, password: password })
            .then(response => {
                return response;
            });
    },
    authMe(email, password) {
        return instance2.post("/login", { email: email, password: password })
            .then(response => {
                return response;
            });
    },
    getTasks() {
        return instance.get("/")
            .then(response => {
                return response;
            });
    },
    postTask(input,) {
        return instance.post("/updated", { input: input })//CREATE//UPDATE - input
            .then(response => {
                return response;
            });
    },
    updateTask(id, input, checked) {
        return instance.post("/updated/", { id: id, input: input, checked: checked })//UNPDATE- checked
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



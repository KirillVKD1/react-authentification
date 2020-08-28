import * as axios from 'axios';
const instance = axios.create({ //axios.create sam vstraivaet vse nastroiki dla zaprosa na server, kotorie vpishem!!!
    baseURL: 'http://localhost:3010/api/posts',//bwithCredentials: true, //authorized = true  
}); 

const instance2 = axios.create({ //axios.create sam vstraivaet vse nastroiki dla zaprosa na server, kotorie vpishem!!!
    baseURL: 'http://localhost:3010/api/users',//bwithCredentials: true, //authorized = true  
});
export const API = {
     
    singUpPost(email,password) {
        return instance2.post("/auth/signUp", { email: email, password: password })
            .then(response => {
                return response;
            });
    },
    authMe(email, password) {
        return instance2.get("/auth", { email: email, password: password })
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
    postTask(input) {
        return instance.post("/updated/", { input: input })//CREATE//UPDATE - input
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



import axios from "axios";

class ToDoListService {
    baseUrl = "http://localhost:9090/todolist";

    createToDoList(data) {
       console.log(data);
      return axios.post(`${this.baseUrl}/create`,data);
    };

    findAllList() {
      return axios.get(`${this.baseUrl}/getAll`);
    }

    deleteList(id) {
      return axios.delete(`${this.baseUrl}/delete/${id}`);
    };

    findListById(id) {
      return axios.get(`${this.baseUrl}/getListById/${id}`);
    };

    updateList(id){
      return axios.put(`${this.baseUrl}/update/${id}`);
    };

  }
  export default new ToDoListService();
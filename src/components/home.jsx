import React, { Component } from "react";
import "./home.scss";
import { withRouter } from "react-router-dom";
import ToDoListService from "../services/ToDoListService";
import { Button,TextField } from "@mui/material";
import Swal from 'sweetalert2'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toDoList: [],
            updateDone: '',
            title: '',
        };
    }

    fetchData() {
        ToDoListService.findAllList().then((response) => {
          //  console.log(response.data);
            this.setState({ toDoList: response.data.data });
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    deleteList(listId){
        console.log("List id",listId);
        ToDoListService.deleteList(listId);
        return Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your data has been deleted.',
                'success'
              )
              window.location.reload();
            }
          })
    }

    handelUpdate = (event) => {
        this.setState({
            updateDone: event.target.value
        })
    }

    updateToDoList(listId){
        console.log("List Id : ",listId)
        ToDoListService.updateList(listId);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been Done..!',
            showConfirmButton: false,
            timer: 1500
          })
        window.location.reload();
    };

    handelcreate = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    createToDoList(){
        let titleNew = {
            title: this.state.title
          }
          console.log(titleNew);
        ToDoListService.createToDoList(titleNew);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Work has been added to list.!',
            showConfirmButton: false,
            timer: 1500
          })
        window.location.reload();
    };

    render() {
        return (
            <div>
                <div>
                    <div className="main-content">
                        <div className="header-content employee-header">
                            <div className="emp-detail-text">
                                To Do List Details
                            </div>                        
                        </div>
                    
                     <div className="table-main">
                        <table id="table-display" className="table">
                            <thead>
                                <tr>
                                    <th>Serial No.</th>
                                    <th>Description</th>                             
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.toDoList && this.state.toDoList.map((toDoList,i) => (
                                    <tr key={toDoList.id}>
                                    
                                        <td>{i + 1}</td>
                                        <td>{toDoList.title}</td>
                                        <td>
                                            {toDoList.done === false ?
                                                <Button type="sumit" variant="contained" size="small" color="success" onChange={this.handelUpdate}
                                                     onClick={() => this.updateToDoList(toDoList.id)}>Done</Button> :
                                                <Button type="sumit" disabled='true' variant="contained" size="small" color="info">Done</Button>
                                            }&nbsp;
                                            <Button type="sumit" variant="contained" size="small" onClick={() => this.deleteList(toDoList.id)} color="info">Delete</Button>   
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> &nbsp;&nbsp;
                        <TextField
                            required
                            rows={3}
                            placeholder="Please Enter New To Do list description here....."
                            name='title'
                            onChange={this.handelcreate}
                            style={{
                              width: '60%', height: '10%',
                              fontSize: '20px'
                            }}
                          />&nbsp;&nbsp;&nbsp;
                          <Button type="sumit" name="title" color="inherit" sx={{ marginLeft: '0%', marginTop:"8px" }} variant="contained" size="medium" 
                              onClick={() => this.createToDoList() }>Add to List</Button>
                    </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default withRouter(Home);
import React from 'react';
import swal from 'sweetalert';

import TasksForm from './Form';
import axios from '../../config/axios';

class TasksNew extends React.Component{
    handleSubmit = (formData) => {
        axios.post('/tasks', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    swal ("Oops", `${response.data.errors}` ,"error")
                }else{
                    swal("Success!", "Task Added Successfully!", "success")
                    this.props.history.push('/tasks')
                }
            })
            .catch((err) => {
                swal ("Oops", `${err}` ,"error")  
            })
    }

    render(){
        return(
            <div>
                <h2 className="text-center">Add Task Information</h2><hr/>
                <TasksForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default TasksNew
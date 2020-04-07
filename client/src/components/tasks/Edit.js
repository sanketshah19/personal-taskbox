import React from 'react';
import swal from 'sweetalert';

import TasksForm from './Form';
import axios from '../../config/axios';

class TasksEdit extends React.Component{
    constructor(){
        super()
        this.state = {
            task: {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/tasks/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const task = response.data
                this.setState({task})
            })
            .catch((err) => {
                swal ("Oops", `${err}` ,"error")
            })
    }
    
    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        axios.put(`/tasks/${id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                if(response.data.hasOwnProperty('errors')){
                    swal ("Oops", `${response.data.errors}` ,"error")
                }else{
                    swal("Success!", "Task Updated Successfully!", "success")
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
                <h2 className="text-center">Edit Task Information</h2><hr/>
                {Object.values(this.state.task).length !== 0 && <TasksForm task={this.state.task} handleSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}

export default TasksEdit
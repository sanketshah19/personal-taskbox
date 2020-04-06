import React from 'react';
import swal from 'sweetalert';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Badge, Button, Card, CardColumns, Form} from 'react-bootstrap';

import axios from '../../config/axios';

class TasksList extends React.Component{
    constructor(){
        super()
        this.state = {
            tasks: []
        }
    }

    componentDidMount(){
        axios.get('/tasks', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                console.log(response.data)
                const tasks = response.data
                this.setState({tasks})
            })
            .catch((err) => {
                swal ("Oops", `${err}` ,"error")
            })
    }

    render(){
        return(
            <div className="container-fluid">
                    <h2 className="text-center mt-1">Listing Tasks</h2><hr/>
                    <div className="row">
                        <div className="col-md-2"><Link to="/tasks/new"><Button variant="outline-primary">Add Task</Button></Link> </div>
                        <div className="col-md-4 offset-md-5"><Form.Control onChange={this.handleSearch} className="form-control" type="search" placeholder="Search by task or label..."/></div>
                    </div>
                    <CardColumns className="row mt-3">
                        {
                            this.state.tasks.map((task) => {
                                return(
                                    <div className="col-md-4 mr-0" key={task._id}>
                                        <Card border="primary" text="black" style={{width: "15rem", borderRadius: "15px" }}>
                                            
                                            <Card.Body>
                                            <Card.Title>
                                                {task.title} 
                                                {
                                                    task.status && task.status.map(status => status.type).includes('New') && <Badge pill variant="danger" className="mr-auto ml-5">New</Badge>
                                                }
                                                {
                                                    task.status && task.status.map(status => status.type).includes('In Progress') && <Badge pill variant="primary" className="ml-5">In Progress</Badge>
                                                }
                                                {
                                                    task.status && task.status.map(status => status.type).includes('Completed') && <Badge pill variant="success" className="ml-5">Completed</Badge>
                                                }
                                            </Card.Title><hr/>
                                            <Card.Text>
                                                <strong>Labels</strong>: {task.labels && task.labels.map(label => <Badge variant="light" key={label._id}>{label.name}</Badge>)}<br/>
                                                <strong>Due Date</strong>: {moment(task.dueDate).format('LL')}
                                            </Card.Text>
                                            </Card.Body>
                                            <Card.Footer className="text-muted">Created At: {moment(task.createdAt).startOf('day').fromNow()}</Card.Footer>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </CardColumns>
            </div>
        )
    }
}

export default TasksList
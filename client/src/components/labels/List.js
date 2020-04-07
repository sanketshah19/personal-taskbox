import React from 'react';
import swal from 'sweetalert';
import {Button, Table} from 'react-bootstrap';

import axios from '../../config/axios';
import LabelsNew from './New';

import LabelForm from '../../Images/LabelForm.jpg';

class LabelsList extends React.Component{
    constructor(){
        super()
        this.state = {
            labels: []
        }
    }

    componentDidMount(){
        axios.get('/labels', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const labels = response.data
                this.setState({labels})
            })
            .catch((err) => {
                swal("Oops", `${err}` ,"error")
            })
    }

    handleRemove = (id) => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Label Deleted Successfully!", {
                icon: "success",
              })
              axios.delete(`/labels/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then((response) => {
                    const labels = this.state.labels.filter(label => label._id !== id)
                    this.setState({labels})
                })
                .catch((err) => {
                    swal("Oops", `${err}` ,"error")
                })
            } 
          })
    }

    render(){
        return(
            <div>
                <h2 className="text-center mt-1">Listing Labels</h2><hr/>
                <LabelsNew/>
                <div className="row mt-3">
                    <div className="col-md-6 mx-auto">
                        <img style={{width: '85%', height: '85%'}} src={LabelForm} alt="LabelForm" />
                    </div>
                    <div className="col-md-6 mx-auto text-center">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Labels</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.labels.map((label, i) => {
                                        return(
                                            <tr key={label._id}>
                                                <td>{i+1}</td>
                                                <td>{label.name}</td>
                                                <td><Button variant="outline-danger" onClick={() => this.handleRemove(label._id)}>Remove</Button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default LabelsList
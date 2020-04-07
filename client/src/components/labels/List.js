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

    }

    handleSubmit = (formData) => {
        // axios.post('/labels', formData, {
        //         headers: {
        //             'x-auth': localStorage.getItem('authToken')
        //         }
        //     })
        //         .then((response) => {
        //             if(response.data.hasOwnProperty('errmsg')){
        //                 if(response.data.name === "BulkWriteError" && response.data.code === 11000){
        //                     swal ("Oops", `${response.data.op.name} already exists` ,"error")
        //                 }
        //             }else if(response.data.hasOwnProperty('errors')){
        //                 swal("Oops!", `${response.data.message}`, "error")
        //             }else{  
        //                 swal("Success!", "Label Added Successfully!", "success")
        //                 const label = response.data
        //                 this.setState((prevState) => ({...prevState.labels.concat() label}))
        //             }
        //             console.log(response)
        //         })
        //         .catch((err) => {
        //             swal("Oops", `${err}` ,"error")
        //         })
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
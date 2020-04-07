import React from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import DateTime from 'react-datetime';
import {Button} from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import './picker.css';
import axios from '../../config/axios';

import TaskFormImg from '../../Images/TaskForm.jpg';

class TasksForm extends React.Component{
    constructor(props){
        super(props)
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
                console.log(response)
                const labels = []
                response.data.map(item => {
                    return labels.push({'label': item.name,'value': item._id})
                })
                this.setState({labels})
            })
            .catch((err) => {
                swal ("Oops", `${err}` ,"error")
            })
    }

    labelsPostHandle = (newLabels)=>{
        if(newLabels && newLabels !== ""){
            return axios.post('/labels', newLabels, {
                headers: {
                    'x-auth':localStorage.getItem('authToken')
                }
            })
        }else{
            return Promise.resolve({'data': []})
        }
    }

    render(){
        return(
            this.state.labels.length !== 0 &&
            (
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <img style={{width: '100%', height: '100%'}} src={TaskFormImg} alt="TaskForm"/>
                    </div>
                    <div className="col-md-6 mx-auto">
                        <Formik
                            initialValues={{
                                title: this.props.task ? this.props.task.title : '',
                                status: this.props.task ? this.props.task.status.map(status => status.type) : '',
                                label: this.props.task ? this.props.task.labels.map(label=>{return{'label':label.name,'value':label._id}}) : '',
                                newLabels: '',
                                isLoading:false,
                                dueDate: this.props.task ? moment(this.props.task.dueDate).utc() : new Date()
                            }}
                            validationSchema={Yup.object().shape({
                                title: Yup.string()
                                    .min(3, 'Title must be at least 3 characters')
                                    .required('Title is required'),
                                status: Yup.array()
                                    .ensure()
                                    .required('Status is required'),
                                label: Yup.array()
                                    .ensure()
                                    .required('Must have atleast one label'),
                                dueDate: Yup.date()
                                    .min(new Date(),'Due date should be a future date')
                                    .required('Must enter a Date')   
                            })}
                            onSubmit={(values, {setSubmitting,resetForm}) => {
                               this.labelsPostHandle(values.newLabels)
                                    .then(response => {
                                        const label = []
                                        response.data.map(item => label.push(item._id))  //new items
                                        values.label.map(item => !item.__isNew__ ? label.push(item.value) : item)  //old items
                                        const formData = {
                                            "title": values.title,
                                            "labels": label,
                                            "dueDate": values.dueDate, 
                                            "status": [{"type": values.status}]
                                            }
                                        this.props.handleSubmit(formData)
                                    })
                                    .catch(err => {
                                        swal ("Oops", `${err}` ,"error")
                                    })
                            }}
                            render={({ values, errors, status, setFieldValue, setFieldTouched, touched }) => (
                                <Form style={{ border: "thin solid #007BFF", padding: "2rem", margin: "2rem", borderRadius:'15px'}}>
                                    
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} placeholder="Enter Title"/>
                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <Field name="status" as="select" className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')} placeholder="Select Status" value={values.status}>
                                            <option value="">Select Status</option>
                                            <option value="New">New</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </Field>
                                        <ErrorMessage name="status" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="label">Labels</label>
                                        <CreatableSelect
                                        placeholder="Grab your labels here"
                                        name = "label"
                                        isClearable
                                        onBlur={() => setFieldTouched("label")}
                                        isMulti
                                        isDisabled={values.isLoading}
                                        isLoading={values.isLoading}
                                        onChange={
                                            (selectedOptions) => {
                                            const newLabels = []
                                            selectedOptions && selectedOptions.map(label => {
                                                if(label.__isNew__){
                                                    newLabels.push({'name':label.value})   
                                                }
                                                return label
                                            })
                                            setFieldValue('label', selectedOptions)
                                            setFieldValue('newLabels', newLabels) }
                                        }
                                        options={this.state.labels}
                                        className={(errors.label && touched.label ? ' is-invalid' : '')}
                                        value={values.label}
                                        />
                                        <ErrorMessage name="label" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="dueDate">Due Date</label>
                                        <DateTime 
                                        name="dueDate"
                                        placeholder="Select due date"
                                        onBlur={()=>setFieldTouched("dueDate")}
                                        onChange={(moment)=>{
                                            moment && setFieldValue('dueDate', moment.utc())} }
                                        className={(errors.dueDate && touched.dueDate ? ' is-invalid' : '')}
                                        value={values.dueDate}
                                        />
                                        <ErrorMessage name="dueDate" component="div" className="invalid-feedback" />
                                    </div>
                                   
                                    <div className="form-group">
                                        <Button variant="primary" type="submit" size="lg" className="col-md-4 offset-md-2 mr-2 mt-1" value="Submit">Submit</Button>
                                        <Link to="/tasks"><Button variant="primary" size="lg" className="col-md-4 mt-1">Back</Button></Link>
                                    </div>

                                </Form>
                            )}
                        />
                    </div>
                </div>
            )
        )
    }
}

export default TasksForm
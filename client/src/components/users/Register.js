import React from 'react';
import * as Yup from 'yup';
import swal from 'sweetalert';
import {Button} from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import axios from '../../config/axios';

import RegisterImg from '../../Images/Register.jpg';

class Register extends React.Component{
    

    render(){
        return(
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <img style={{width: '100%', height: '100%'}} src={RegisterImg} alt="Registration"/>
                    </div>
                    <div className="col-md-6 mx-auto">
                        <h2 className="text-center">Join Now</h2><hr/>
                        <Formik
                            initialValues={{
                                username: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                            }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string()
                                    .min(5, 'Username must be at least 5 characters')
                                    .required('Username is required'),
                                email: Yup.string()
                                    .email('Email is invalid')
                                    .required('Email is required'),
                                password: Yup.string()
                                    .min(6, 'Password must be at least 6 characters')
                                    .required('Password is required'),
                                confirmPassword: Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                    .required('Confirm Password is required')
                            })}
                            onSubmit={formData => {
                                axios.post('/users/register', formData)
                                    .then((response) => {
                                        if(response.data.hasOwnProperty('errmsg')){
                                        if(response.data.name === "MongoError" && response.data.code === 11000){
                                            swal ("Oops", `${Object.keys(response.data.keyValue)} already exists` ,"error")
                                        }
                                        }else if(response.data.hasOwnProperty('errors')){
                                        swal("Oops!", `${response.data.message}`, "error")
                                        }else{
                                        this.props.history.push('/users/login')
                                        swal("Success!", "User Registered Successfully!", "success")
                                        }
                                    })
                                    .catch((err) => {
                                        swal ("Oops", `${err}` ,"error")
                                    })
                            }}
                            render={({ errors, status, touched }) => (
                                <Form style={{ border: "thin solid #007BFF", padding: "2rem", margin: "2rem", borderRadius:'15px'}}>
                                    
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <Button variant="primary" type="submit" size="lg" className="col-md-4 offset-md-2 mr-2 mt-1" value="Submit">Register</Button>
                                        <Button variant="primary" type="reset" size="lg" className="col-md-4 mt-1" value="Submit">Reset</Button>
                                    </div>

                                </Form>
                            )}
                        />
                    </div>
                </div>
        )
    }
}

export default Register
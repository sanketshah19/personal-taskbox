import React from 'react';
import * as Yup from 'yup';
import swal from 'sweetalert';
import {Button} from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import axios from '../../config/axios';

import LoginImg from '../../Images/Login.jpg';

class Login extends React.Component{
        
        render(){
        return(
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h2 className="text-center">Sign In</h2><hr/>
                    <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email('Email is invalid')
                                    .required('Email is required'),
                                password: Yup.string()
                                    .min(6, 'Password must be at least 6 characters')
                                    .required('Password is required'),
                            })}
                            onSubmit={formData => {
                                axios.post('/users/login', formData)
                                    .then((response) => {
                                        if(response.data.hasOwnProperty('errors')){
                                            swal ("Oops", `${response.data.errors}` ,"error")
                                        }else{
                                            swal("Success!", "Login Successfully!", "success")
                                            setTimeout(() => {
                                            const token = response.data.token
                                            localStorage.setItem('authToken', token)
                                            this.props.history.push('/')
                                            window.location.reload()
                                            }, 500)
                                        }
                                    })
                                    .catch((err) => {
                                        swal ("Oops", `${err}` ,"error")  
                                    })
                            }}
                            render={({ errors, status, touched }) => (
                                <Form style={{ border: "thin solid #007BFF", padding: "2rem", margin: "2rem", borderRadius:'15px'}}>
                                    
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
                                        <Button variant="primary" type="submit" size="lg" className="col-md-6 offset-md-3" value="Submit">Login</Button>
                                    </div>

                                </Form>
                            )}
                        />
                </div>
                <div className="col-md-6 mx-auto">
                    <img style={{width: '100%', height: '100%'}} src={LoginImg} alt="Login"/>
                </div>
            </div>
        )
    }

}

export default Login
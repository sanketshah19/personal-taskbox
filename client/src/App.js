import React from 'react';
import swal from 'sweetalert';
import {Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import axios from './config/axios';
import PrivateRoute from './components/privateRoute/PrivateRoute'

import Home from './components/common/Home';
import Register from './components/users/Register';
import Login from './components/users/Login';

import TasksList from './components/tasks/List';

function App() {
  function handleLogout(){
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete('/users/logout', {
                headers: {
                  'x-auth': localStorage.getItem('authToken')
                }
              })
              .then((response) => {
                swal("Successfully Logout!", {
                  icon: "success",
                })
                localStorage.removeItem('authToken')
                setTimeout(() => {
                  window.location.reload()
                  window.location.href = "/"
                }, 500);
              })
              .catch((err) => {
                swal ("Oops", `${err}` ,"error")
              })
      }
    })
  }
  return (
    <div className="container-fluid">
      <BrowserRouter>
      {
        localStorage.getItem('authToken') ? 
        (
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Taskbox</Navbar.Brand>
            <Nav.Item className="ml-auto">
              <Link to="/" className="ml-2">Home</Link>
              <Link to="/tasks" className="ml-2">Tasks</Link>
              <Link to="/labels" className="ml-2">Labels</Link>
              <Link to="/calendar" className="ml-2">Calendar</Link>
              <Link to="#" onClick={handleLogout} className="ml-2">Logout</Link>
            </Nav.Item>
          </Navbar>
        ) 
        : 
        (
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Taskbox</Navbar.Brand>
            <Nav.Item className="ml-auto">
              <Link to="/" className="ml-2">Home</Link>
              <Link to="/users/register" className="ml-2">Register</Link>
              <Link to="/users/login" className="ml-2">Login</Link>
            </Nav.Item>
          </Navbar>
        )
      }

        <Switch>

          <Route path="/" component={Home} exact={true} />
          <Route path="/users/register" component={Register} />
          <Route path="/users/login" component={Login} />

          <PrivateRoute path="/tasks" component={TasksList} exact={true} />

        </Switch>

      </BrowserRouter>
    </div>
  )
}

export default App
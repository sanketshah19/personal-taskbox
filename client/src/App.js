import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import Home from './components/common/Home';
import Register from './components/users/Register';
import Login from './components/users/Login';

function App() {
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
              <Link to="/calender" className="ml-2">Calender</Link>
              <Link to="#" className="ml-2">Logout</Link>
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

        </Switch>

      </BrowserRouter>
    </div>
  )
}

export default App
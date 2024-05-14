import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm.jsx';
import Home from './components/Home.jsx';
import  UserContextProvider from './components/UserContextProvider.jsx';
import LoginForm from './components/LoginForm.jsx';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import ProtectedAuthRoute from './components/ProtectedAuthRoute.jsx';
import Profile from './components/Profile.jsx';
import MyNav from './components/NavBar.jsx';
import Users from './components/Users.jsx';

function App() {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" 
          element={
            <Container className='access'>
              <h1 className='me-5'>Benvenuto in StriveBlog</h1>
              <Link to="/register">
                <Button className="me-2"variant="primary">Registrati</Button>
              </Link>
              <Link to="/login">
                <Button variant="success">Accedi</Button>
              </Link>
            </Container>
          }/>
          <Route path="/register" element={<RegistrationForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          
          <Route element={<ProtectedAuthRoute/>}>
            <Route path="/profile" element={<div><MyNav/><Profile/></div>}/>
            <Route path="/home" element={<div><MyNav/><Home/></div>}/>
            <Route path="/users" element={<div><MyNav/><Users/></div>}/>
          </Route>
          <Route path="/*" element={<h1>404 Page non found</h1>}></Route>
        </Routes>
    </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;

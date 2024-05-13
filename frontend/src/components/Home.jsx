import React, {useContext} from 'react';
import MyNav from './NavBar';
import AddPostArea from './AddPostArea';
import {Row, Col, Container }from "react-bootstrap";
import "./styles.css";
import Posts from "./Posts"

export default function Home(){
  const nameData = localStorage.getItem("name");

  return (
    <div>
      <Container className='mt-5'>
      <h3>Bentornato {nameData}</h3>
        <Row className='justify-content-between'>
          <Col className='form-add-post' md={5}  style={{maxHeight: "80vh"}}>
            <AddPostArea/>
          </Col>
          <Col className='form-add-post' md={7}>
            <Posts/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

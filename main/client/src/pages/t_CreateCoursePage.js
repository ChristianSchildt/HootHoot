import React, { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderRole from '../components/HeaderRole.js';
import InputField from '../components/InputField.js';
import Button from '../components/Button.js';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";





function t_CreateCoursePage(){

    const inputKursname = useRef(null);
    const createCourse = async c => {
        
        
        try{
            
            let body = {
                name: inputKursname.current.getValue(),
            };
            // Send data to the backend via POST
            const response = await fetch('http://localhost:5000/api/courses/', { 
    
            method: 'POST', 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
    
            })
            window.location.href = "/teacher/homeMenu";
        }catch(e) {
            console.log(e);
        }
      }


    return(
        <div className="tCreateCoursePage">
        <Container fluid>
            <Row>
                <Col>
                    <HeaderRole
                        headervalue="Kurs erstellen">
                    </HeaderRole>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField
                        className="inputField"
                        ref={inputKursname}
                        placeholder="Kursname">
                    </InputField>
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <Button
                        className="button"
                        id="button-create-course"
                        value="Kurs erstellen"
                        onClick={createCourse}>
                    </Button>
                </Col>
            </Row>
        </Container>
    </div>
    );
}

export default t_CreateCoursePage;
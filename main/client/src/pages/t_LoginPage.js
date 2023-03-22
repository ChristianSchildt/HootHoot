import React, { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderRole from '../components/HeaderRole.js';
import InputField from '../components/InputField.js';
import Button from '../components/Button.js';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const T_LoginPage = ({ setAuth }) =>  {
    
    const inputEmail = useRef(null);
    const inputPassword = useRef(null);

    const login = async e => {
        // TODO: validate input

        e.preventDefault();
        try {
          const body = { email: inputEmail.current.getValue(), password: inputPassword.current.getValue() };
          const response = await fetch(
            "http://localhost:443/authentication/login",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
    
          const parseRes = await response.json();
    
          if (parseRes.jwtToken) {
            localStorage.setItem("token", parseRes.jwtToken);
            toast.success("Logged in Successfully");
            window.location.href = "/teacher/libraryMenu";
          } else {
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
        }
      };

    return(
        <div className="tLoginPage">
            <Container fluid>
            <Row>
                {/* Eule einbinden */}
                <Col>
                    <HeaderRole
                        headervalue="HootHoot"
                        rolevalue="- Lehrkraft -">
                    </HeaderRole>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField
                        ref={inputEmail}
                        className="inputField"
                        placeholder="E-Mail eingeben...">
                    </InputField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField
                        ref={inputPassword}
                        className="inputField"
                        type="password"
                        placeholder="Passwort eingeben...">
                    </InputField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="button"
                        id="button-login-loginpage"
                        value="Anmelden"
                        onClick={login}>
                    </Button>
                </Col>
            </Row>
        </Container>
        </div>
        
    );
}

export default T_LoginPage;
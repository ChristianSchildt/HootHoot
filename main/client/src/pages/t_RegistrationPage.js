import React, { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderRole from '../components/HeaderRole.js';
import InputField from '../components/InputField.js';
import Button from '../components/Button.js';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const t_RegistrationPage = ({ setAuth }) => {
    const inputName = useRef(null);
    const inputEmail = useRef(null);
    const inputPassword1 = useRef(null);
    const inputPassword2 = useRef(null);

    const register = async e => {
        // TODO: input validation
    
        e.preventDefault();
        try {
            let body = {
                email: inputEmail.current.state.value,
                password: inputPassword1.current.state.value,
                name: inputName.current.state.value
            };
            const response = await fetch("http://localhost:5000/authentication/register",
            {
                method: "POST",
                headers: {
                "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                toast.success("Registered Successfully");
                window.location.href = "/teacher";          
            } else {
                toast.error(parseRes);
            }
        } catch (err) {
            console.error('onSubmit form error: ', err.message);
        }
    }

    return (
        <div className="tRegistrationPage">
            <Container fluid>
                <Row>
                    <Col>
                        {/* Eule einbinden */}
                        <HeaderRole
                            headervalue="HootHoot"
                            rolevalue="- Lehrkraft -">
                        </HeaderRole>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField
                            ref={inputName}
                            className="inputField"
                            placeholder="Namen eingeben...">
                        </InputField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField
                            ref={inputEmail}
                            className="inputField"
                            placeholder="E-Mail Adresse eingeben...">
                        </InputField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField
                            ref={inputPassword1}
                            className="inputField"
                            type="password"
                            placeholder="Passwort eingeben...">
                        </InputField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField
                            ref={inputPassword2}
                            className="inputField"
                            type="password"
                            placeholder="Passwort erneut eingeben...">
                        </InputField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            className="button"
                            id="button-registration-registrationpage"
                            value="Registrieren"
                            onClick={register}>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}



export default t_RegistrationPage;
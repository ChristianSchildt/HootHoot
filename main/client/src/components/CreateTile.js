import React, { useRef, useState, useEffect } from 'react';
import '../css/CreateTile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from './Text.js';
import Picture from './Picture';
import MuiButton from '@mui/material/Button';
import MuiTextField from '@mui/material/TextField';
import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogContentText from '@mui/material/DialogContentText';
import MuiDialogTitle from '@mui/material/DialogTitle';
import getCourses from '../pages/t_LibraryMenuPage';



function CreateTile()  {
    
    
    const inputKursname = useRef(null);
    
    const createCourse = async () => {
        try{
            console.log(inputKursname)
            let body = {name: inputKursname.current.value};
            console.log(body);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("jwt_token", localStorage.token);
            const response = await fetch('http://193.175.85.52:443/api/courses/', { 
    
                method: 'POST', 
                headers: myHeaders, 
                body: JSON.stringify(body)
        
            })
            handleClose();
            //window.location.href = "/teacher/homeMenu";

        }catch(e) {
            console.log(e);
        }
      }
    
    const [open, setOpen] = useState(false);
    
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };  
    
        
      

    return (
        <div className={"createTile"}>
            <Container fluid>
                <Row>
                    <Col>
                        <Text
                            id="createTile-header"
                            // TODO: Values auslagern
                            value="Erstellen">
                        </Text>
                    </Col>
                </Row>
                <div className="div-createTile">
                    <Row>
                        <Col>
                            <Text
                                className="createTile-text"
                                // TODO: Values auslagern
                                value="Kurs">
                            </Text>
                        </Col>
                        <Col>
                        <Picture
                            className="symbol-add"
                            src="/images/add.png"
                            alt="Plus"
                            variant="outlined"
                            //href="/teacher/homeMenu"
                            onClick={handleClickOpen}
                            >
                        </Picture>
                        <MuiDialog open={open} onClose={handleClose}>
                                <MuiDialogTitle>Neuen Kurs erstellen</MuiDialogTitle>
                                <MuiDialogContent>
                                <MuiDialogContentText>
                                    Geben Sie hier den Kursnamen ein: 
                                </MuiDialogContentText>
                                <MuiTextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Kursname"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    inputRef={inputKursname}
                                />
                                </MuiDialogContent>
                                <MuiDialogActions>
                                <MuiButton onClick={handleClose}>Schließen</MuiButton>
                                <MuiButton onClick={()=> createCourse()}>Kurs erstellen</MuiButton>
                                </MuiDialogActions>
                            </MuiDialog>
                        </Col>
                    </Row>
                </div>
                <div className="div-createTile">
                    <Row>
                        <Col>
                            <Text
                                className="createTile-text"
                                // TODO: Values auslagern
                                value="HootHoot">
                            </Text>
                        </Col>
                        <Col>
                            <Picture
                                className="symbol-add"
                                src="/images/add.png"
                                alt="Plus"
                                >
                            </Picture>
                            
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
  }


export default CreateTile;
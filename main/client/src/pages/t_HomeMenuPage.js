import React, { useRef, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Picture from '../components/Picture';
import MenuNavigation from '../components/MenuNavigation';
import CreateTile from '../components/CreateTile';
import Field from '../components/Field';
import CourseTile from '../components/CourseTile';
import NewsTile from '../components/NewsTile';
import ProfileMenu from '../components/ProfileMenu';


function t_HomeMenuPage(){
    
    const [courses, setCourses] = useState([]);

    async function deleteCourse(id) {
        try{
            await fetch(`http://localhost:5000/api/courses/${id}`, {
                method: "DELETE",
               });
            getCourses();
        }catch(e){
            console.log(e);
        }
    }

 /*    const deleteCourse = async () =>{
        try{
            await fetch(`http://localhost:5000/api/courses/${id}`, {
                method: "DELETE",
               });
              
        }catch(e){
            console.log(e);
        }
    }
 */
    const getCourses = async () => {
        try{
            const response = await fetch('http://localhost:5000/api/courses');
            const data = await response.json();
            setCourses(data);
            console.log(courses);
        }catch(e){
            console.log(e);
        }
    }

    
    useEffect(() => {
        getCourses();
    },[])
    
    
    
    return(
        
        <div className = "tHomeMenuPage">
            <Container fluid>
                <Row>
                    <Col md={2}>
                            <Picture
                            id="logomenue"
                            src="/images/profil.png"
                            alt="Platzhalter Profilbild">
                        </Picture>
                        <Text
                            className="projectname-left"
                            value="HootHoot">
                        </Text>
                    </Col>
                    <Col md={7}>
                        <MenuNavigation 
                            className="menu-navigation"
                            id1="mark-home">
                        </MenuNavigation>
                    </Col>
                    <Col md={{ span: 2, offset: 1}}>
                        <ProfileMenu/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field classNameField="field"
                            classNameTitle="field-title"
                            valueTitle="Neuigkeiten">
                            <NewsTile classNameNewstext="newstext" valuetext="Willkommen bei HootHoot:)"/>
                            <NewsTile classNameNewstext="newstext" valuetext="Du hast ein neues HootHoot erstellt!"/>
                        </Field>
                    </Col>
                    <Col>
                        <Field classNameField="field"
                            classNameTitle="field-title"
                            valueTitle="Meine Kurse">

                            {courses.map((course) => {
                                return (
                                    <div>
                                         <span onClick={() => deleteCourse(course.id)} style={{marginLeft:"10px", color:"red", cursor:"pointer"}}>x</span>
                                    <CourseTile 
                                        
                                        key={course.id} 
                                        //TODO: Kursbild aus DB einfügen
                                        srcPicture=""
                                        valuetext={course.name}>
                                    </CourseTile>
                                    </div>
                                );
                            })}
                        </Field>
                        <CreateTile
                            className="createTile">
                        </CreateTile>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default t_HomeMenuPage;
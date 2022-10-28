import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Picture from '../components/Picture';
import MenuNavigation from '../components/MenuNavigation';
import Field from '../components/Field';
import LibraryTile from '../components/LibraryTile';
import InputField from '../components/InputField';
import ProfileMenu from '../components/ProfileMenu';

class t_LibraryMenuPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            courses: [
                {   
                    "id": 1,
                    "name": "Webtechnologien I",
                    "kalenderwoche": ['kw1', 'kw2']
                },
                {
                    "id": 2,
                    "name": 'Webtechnologien II',
                    "kalenderwoche": ['kw1', 'kw2']
                },
                {
                    "id": 3,
                    "name": 'IT-Sicherheit',
                    "kalenderwoche": ['kw1']
                },
                {
                    "id": 4,
                    "name": 'Betriebssysteme',
                    "kalenderwoche": ['kw1']
                }
                
            ],
            hoothoots: [
                {   
                    "id": 1,
                    "name": "Wie gefällt ihnen die Präsentation?",
                    "kalenderwoche": ['kw1', 'kw2']
                },
                {
                    "id": 2,
                    "name": 'Dummy2?',
                    "kalenderwoche": ['kw1', 'kw2']
                },
                {
                    "id": 3,
                    "name": 'Dummy3?',
                    "kalenderwoche": ['kw1']
                },
                {
                    "id": 4,
                    "name": 'Dummy4?',
                    "kalenderwoche": ['kw1']
                }               
            ]
        };
    }  

    render(){
        return(
            <div className = "tLibraryMenuPage">
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
                            <MenuNavigation className="menu-navigation"/>
                        </Col>
                        <Col md={{ span: 2, offset: 1}}>
                            <ProfileMenu/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field classNameField="field"
                                classNameTitle="field-title"
                                valueTitle="Kurse">
                                <InputField
                                className="inputField"
                                placeholder="Suche Kurs..."/>                               

                                {this.state.courses.map((course) => (  
                                    <LibraryTile key={course.id.toString()} classNameLibrarytext="librarytext" valuetext={course.name} /> 
                                ))}
                            </Field>
                        </Col>
                        <Col>
                            <Field classNameField="field"
                                classNameTitle="field-title"
                                valueTitle="HootHoots">
                                <InputField
                                className="inputField"
                                placeholder="Suche HootHoot..."/>
                                {this.state.hoothoots.map((hoothoot) => (  
                                    <LibraryTile key={hoothoot.id.toString()} classNameLibrarytext="librarytext" valuetext={hoothoot.name} /> 
                                ))}
                            </Field>
                        </Col>
                    </Row>
                </Container>
            </div>
       );
    }
}

export default t_LibraryMenuPage;
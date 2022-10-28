import React from 'react';
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


class t_HomeMenuPage extends React.Component {
    
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
                ,
                {
                    "id": 5,
                    "name": 'Betriebssysteme',
                    "kalenderwoche": ['kw1']
                }
                ,
                {
                    "id": 6,
                    "name": 'Betriebssysteme',
                    "kalenderwoche": ['kw1']
                }
                ,
                {
                    "id": 7,
                    "name": 'Betriebssysteme',
                    "kalenderwoche": ['kw1']
                }
                ,
                {
                    "id": 8,
                    "name": 'Betriebssysteme',
                    "kalenderwoche": ['kw1']
                }
            ]
        };
    }

    render(){

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
                                {this.state.courses.map((course) => (  
                                    <CourseTile 
                                        key={course.id.toString()} 
                                        //TODO: Kursbild aus DB einfügen
                                        srcPicture=""
                                        valuetext={course.name}>
                                    </CourseTile>
                                ))}
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
}

export default t_HomeMenuPage;
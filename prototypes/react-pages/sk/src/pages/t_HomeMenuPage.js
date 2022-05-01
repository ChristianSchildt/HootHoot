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

class t_HomeMenuPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            courses: {}
        };
    }

    componentDidMount() {
            const coursesdata = [
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
            ];
            this.setState({courses: coursesdata});
    }   

    render(){
        return(
            <div className = "tHomeMenuPage">
                <Container fluid>
                    <Row>
                        <Col md={1}>
                            {/* Eule einbinden */}
                            <Text
                                className="projectname-left"
                                value="HootHoot">
                            </Text>
                        </Col>
                        <Col md={7}>
                            <MenuNavigation className="menu-navigation"/>
                        </Col>
                        <Col md={{ span: 2, offset: 2 }}>
                            <Text
                                id="text-welcome-teacher"
                                value="Guten Tag, Herr Köhn">
                            </Text>
                            {/* TODO: Profilbild einbinden */}
                            <Picture
                                id="profilepicture"
                                src=""
                                alt="Platzhalter Profilbild">
                            </Picture>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CreateTile
                                className="createTile">
                            </CreateTile>
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
                                {this.state.courses?.map((course) => (  
                                    <CourseTile key={course.id.toString()} classNameCoursetext="coursetext" valuetext={course.name} /> 
                                ))}
                            </Field>
                        </Col>
                    </Row>
                </Container>
            </div>
       );
    }
}

export default t_HomeMenuPage;
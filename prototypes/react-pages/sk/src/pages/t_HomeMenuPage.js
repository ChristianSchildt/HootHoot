import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Profilepicture from '../components/Profilepicture';
import MenuButton from '../components/MenuButton';
import CreateTile from '../components/CreateTile';
import CourseTile from '../components/CourseTile';

class t_HomeMenuPage extends React.Component {
    
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className = "tHomeMenuPage">
                <Container fluid>
                    <Row>
                        <Col>
                            {/* Eule einbinden */}
                            <Text
                                className="projectname-left"
                                value="HootHoot">
                            </Text>
                        </Col>
                        <Col>
                            <Text
                                id="text-welcome-teacher"
                                value="Guten Tag, Herr ...">
                            </Text>
                            {/* TODO: Profilbild einbinden
                            <Profilepicture
                                id="profilepicture"
                                src="images/profilbild.jpg">
                            </Profilepicture> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        {/* TODO: Horizontales Menü? 
                            TODO: Neuigkeiten-Tile?*/}
                            <MenuButton
                                className="button-menu"
                                value="Home"
                                href="/teacher/homeMenu">
                            </MenuButton>
                            <MenuButton
                                className="button-menu"
                                value="Bibliothek"
                                href="/teacher/libraryMenu">
                            </MenuButton>
                            <MenuButton
                                className="button-menu"
                                value="Berichte"
                                href="/teacher/analysesMenu">
                            </MenuButton>
                            <MenuButton
                                className="button-menu"
                                value="Gruppen"
                                href="/teacher/groupsMenu">
                            </MenuButton>
                            <CreateTile
                                className="createTile">
                            </CreateTile>
                        </Col>
                        <Col>
                            <div className="my-courses">
                                <Text
                                    className="tile-title"
                                    value="Meine Kurse">
                                </Text>
                                {/* TODO: CourseTiles automatisch erzeugen lassen */}
                                <CourseTile
                                    textvalue="Webtechnologien I">
                                </CourseTile>
                                <CourseTile
                                    textvalue="KW 1">
                                </CourseTile>
                                <CourseTile
                                    textvalue="KW 2">
                                </CourseTile>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
       );
    }
}

export default t_HomeMenuPage;
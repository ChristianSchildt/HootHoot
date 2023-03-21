import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MenuNavigation from '../components/MenuNavigation';
import Picture from '../components/Picture';
import Text from '../components/Text';
import ProfileMenu from '../components/ProfileMenu';
import Field from '../components/Field';
import NewsTile from '../components/NewsTile';

function t_NewsMenuPage(){
    return(
        <div className = "tNewsMenuPage">
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
                            id3="mark">
                        </MenuNavigation>
                    </Col>
                    <Col md={{ span: 2, offset: 1}}>
                        <ProfileMenu/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field classNameField="field-news"
                            classNameTitle="field-title"
                            valueTitle="Neuigkeiten">
                            <NewsTile classNameNewstext="newstext" valuetext="Willkommen bei HootHoot:)"/>
                            <NewsTile classNameNewstext="newstext" valuetext="Du hast ein neues HootHoot erstellt!"/>
                        </Field>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default t_NewsMenuPage;
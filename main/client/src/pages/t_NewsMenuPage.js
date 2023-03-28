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
                    <Col xs={{span: 6, order: 1}} 
                        sm={{span: 7, order: 1}} 
                        md={{span: 8, order: 1}}
                        lg={{span: 3, order: 1}}
                        xl={{span: 3, order: 1}}
                        xxl={{span: 2, order: 1}}>
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
                    <Col xs={{span: 12, order: 3}} 
                        sm={{span: 12, order: 3}} 
                        md={{span: 12, order: 3}}
                        lg={{span: 6, order: 2}}
                        xl={{span: 6, order: 2}}
                        xxl={{span: 8, order: 2}}>
                        <MenuNavigation 
                            className="menu-navigation"
                            id4="mark">
                        </MenuNavigation>
                    </Col>
                    <Col xs={{span: 6, order: 2}}
                        sm={{span: 5, order: 2}} 
                        md={{span: 4, order: 2}}
                        lg={{span: 3, order: 3}}
                        xl={{span: 3, order: 3}}
                        xxl={{span: 2, order: 3}}>
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
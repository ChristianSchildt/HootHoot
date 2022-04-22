import React from 'react';
import '../css/Components.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from './Text.js';

class CreateTile extends React.Component {
  
  render() {
    return (
        <div className={this.props.className}>
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
                <Row>
                    <Col>
                        <Text
                            className="createTile-kurs"
                            // TODO: Values auslagern
                            value="Kurs">
                        </Text>
                    </Col>
                    <Col>
                        <Text
                            // TODO: Values auslagern
                            value="Plus EINFÜGEN">
                        </Text>
                    </Col>
                </Row>   
                <Row>
                    <Col>
                        <Text
                            className="createTile-hoothoot"
                            // TODO: Values auslagern
                            value="HootHoot">
                        </Text>
                    </Col>
                    <Col>
                        <Text
                            // TODO: Values auslagern
                            value="Plus EINFÜGEN">
                        </Text>
                    </Col>
                </Row> 
            </Container>
        </div>
    )
  }
}

export default CreateTile;
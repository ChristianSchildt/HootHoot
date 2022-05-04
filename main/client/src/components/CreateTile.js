import React from 'react';
import '../css/CreateTile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from './Text.js';
import Picture from './Picture';

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
                                alt="Plus">
                            </Picture>

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
                                alt="Plus">
                            </Picture>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
  }
}

export default CreateTile;
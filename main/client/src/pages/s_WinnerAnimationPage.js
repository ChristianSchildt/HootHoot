import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Button from '../components/Button';
import Swinner from '../components/swinner';
import Field from '../components/Field';


class s_WinnerAnimationPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            player: [
                {   
                    "id": 1,
                    "name": "Unicorn"
                },
                {
                    "id": 2,
                    "name": 'Starbucks',
                },
                {
                    "id": 3,
                    "name": 'Pfefferminz'
                }             
            ]
        };
    }  
    render(){
        return(
            <div className = "sWinnerAnimationPage">
                <Container fluid>
                    <Row>
                        <Col md={{span: 8, offset: 2}}>
                            <div id="div-HootHoot-question">
                                <Text
                                    id="HootHoot-question"
                                    value="Top 3 Player!">
                                </Text>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Field idField="winneranimation">
                            <Swinner valuefirst="Leeroy Jenkins" valuesecond="Unicorn" valuethird="Moritz"></Swinner>
                        </Field>
                    </Row>
                    <Row>
                        <Button
                        className="button"
                        id="winnerButton"
                        value="Zurück zur Anmeldung"
                        href="/student">
                        </Button>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default s_WinnerAnimationPage;
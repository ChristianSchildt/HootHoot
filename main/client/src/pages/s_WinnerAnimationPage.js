import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Button from '../components/Button';
import Swinner from '../components/swinner';
import Field from '../components/Field';
import LibraryTile from '../components/LibraryTile';


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
                },
                {
                    "id": 4,
                    "name": 'Hanes'
                },
                {
                    "id": 5,
                    "name": 'Jürgen'
                }
                ,
                {
                    "id": 6,
                    "name": 'Calvin'
                }
                ,
                {
                    "id": 7,
                    "name": 'Klaus'
                }
                ,
                {
                    "id": 8,
                    "name": 'Hans Jürgen Peter'
                },
                {
                    "id": 9,
                    "name": 'Just Better'
                }                ,
                {
                    "id": 10,
                    "name": 'Yasmin'
                }                ,
                {
                    "id": 11,
                    "name": 'Niklas'
                }                ,
                {
                    "id": 12,
                    "name": 'Knor'
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
                    <Row className='winner-row-animation'>
                        <Field idField="winneranimation">
                            <Swinner valuefirst="Leeroy Jenkins" valuesecond="Unicorn" valuethird="Moritz"></Swinner>
                        </Field>
                        <Field idField="winnerattendess">                           
                        {this.state.player.map((player) => (  
                                    <LibraryTile key={player.id.toString()} classNameLibrarytext="librarytext" valuetext={player.name} /> 
                                ))}                  
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
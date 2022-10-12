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
import ContentWinner from '../components/ContentWinner';
import Button from '../components/Button';

class s_WinnerAnimationPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            player: [
                {   
                    "id": 1,
                    "name": "Roland"
                },
                {
                    "id": 2,
                    "name": 'Christian',
                },
                {
                    "id": 3,
                    "name": 'Mustafa'
                },
                {
                    "id": 4,
                    "name": 'Maurice'
                }
                
            ]
        };
    }  
    render(){
        return(
            <div className = "sWinnerAnimationPage">
                <Container fluid>
                    <Row>
                        <ContentWinner
                            contentwinner="Top 3!"
                            first="Whoami"
                            second="Moritz Fiege"
                            third="I<3Köhn">
                            </ContentWinner>
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
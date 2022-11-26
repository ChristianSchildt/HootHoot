import React from 'react';
import '../css/Pages.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../components/Button';
import Picture from '../components/Picture';
import Text from '../components/Text';
import io from 'socket.io-client';



class s_AnswerSelectionPage_Minimalist extends React.Component {
    socket = io('localhost:5000')
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.socket.on('connect', () => {
            console.log("connected")
            this.socket.emit('player-join', { gamepin: "123456", name: "HootHoot"})
        });
    }

    sendAnswer(answer) {
        this.socket.emit("answer", answer)
    }

    render() {
        return(
            <div className="s_Answermin">
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
                    <Col>
                        <Button
                            className="button"
                            id="button_switchansicht"
                            value="Detailierte Ansicht"
                            href="/student/answerselectionDetailed">
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            className="button"
                            id="button-answerad"
                            value="A"
                            onClick={() => this.sendAnswer('A')}>
                        </Button>
                        <Button
                            className="button"
                            id="button-answerbc"
                            value="B"
                            onClick={() => this.sendAnswer('B')}>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            className="button"
                            id="button-answerbc"
                            value="C"
                            onClick={() => this.sendAnswer('C')}>
                        </Button>
                        <Button
                            className="button"
                            id="button-answerad"
                            value="D"
                            onClick={() => this.sendAnswer('D')}>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
        );
    }
}

export default s_AnswerSelectionPage_Minimalist;
import React from 'react';
import '../css/Pages.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../components/Button';
import Picture from '../components/Picture';
import Text from '../components/Text';

class s_AnswerSelectionPage_Minimalist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameStarted: false,
            selectedAnswerIndex: null
        };
    }

    componentDidMount() {
        if (window.connection.socket) {
            window.connection.socket.on('question-started', () => {
                this.setState({gameStarted: true, selectedAnswerIndex: null})
            })
        }
    }

    sendAnswer(answerIndex) {
        if (!this.state.gameStarted || this.state.selectedAnswerIndex != null) {
             return
        }
        this.setState({selectedAnswerIndex: answerIndex})

        if (window.connection.socket) {
            window.connection.socket.emit("answer", answerIndex)
        }
    }

    render() {
        return(
            <div className="s_Answermin">
            <Container fluid>
                <Row>
                    <Col>
                        <Picture
                            id="logomenue"
                            src="/images/profil.png"
                            alt="Platzhalter Profilbild">
                        </Picture>
                        <Text
                            className="projectname-left"
                            value="HootHoot">
                        </Text>
                        {/* Switchbutton um zur Detailierten Seite zu wechseln*/}
                        {/* <Button
                            className="button"
                            id="button_switchansicht_min"
                            value="Detailierte Ansicht"
                            href="/student/answerselectionDetailed">
                        </Button> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            className="button"
                            id="button-answerad"
                            style={{"opacity": this.state.selectedAnswerIndex != null && this.state.selectedAnswerIndex !== 0 ? '0.5': ''}}
                            value="A"
                            onClick={() => {this.sendAnswer(0)}}>
                        </Button>
                        <Button
                            className="button"
                            id="button-answerbc"
                            style={{"opacity": this.state.selectedAnswerIndex != null && this.state.selectedAnswerIndex !== 1 ? '0.5': ''}}
                            value="B"
                            onClick={() => this.sendAnswer(1)}>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            className="button"
                            id="button-answerbc"
                            style={{"opacity": this.state.selectedAnswerIndex != null && this.state.selectedAnswerIndex !== 2 ? '0.5': ''}}
                            value="C"
                            onClick={() => this.sendAnswer(2)}>
                        </Button>
                        <Button
                            className="button"
                            id="button-answerad"
                            style={{"opacity": this.state.selectedAnswerIndex != null && this.state.selectedAnswerIndex !== 3 ? '0.5': ''}}
                            value="D"
                            onClick={() => this.sendAnswer(3)}>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
        );
    }
}

export default s_AnswerSelectionPage_Minimalist;
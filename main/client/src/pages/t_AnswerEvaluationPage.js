import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Picture from '../components/Picture';
import Text from '../components/Text';
import Button from '../components/Button';
import Field from '../components/Field';
import {Chart as ChartJS, CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../css/BarChart.css';
import withNavigate from '../utility/with-navigate';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        // title: {
        //     display: true,
        //     text: 'Spieler Scores',
        // },
    },
};

const players = {'Antwort A': 0, 
                 'Antwort B': 0, 
                 'Antwort C': 0, 
                 'Antwort D': 0};


const data = {
    players,
    datasets: [
      {
        label: 'Dataset 1',
        data: players,
        backgroundColor: '#476D7C',
      },
    ]
};

class t_AnswerEvaluationPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            chartData: data
        }
        
        this.questionsAmount = 1;
        this.currentQuestionIndex = 0;   
        if (this.props.location.state) {
            this.question = this.props.location.state.question;
            this.questionsAmount = this.props.location.state.questionsAmount;
            this.currentQuestionIndex = this.props.location.state.currentQuestionIndex;
        } else {
            // test daten
            this.question = {
                time: 60,
                question: "Keine Frage ausgewählt",
                answers: ["Antwort A", "Antwort B", "Antwort C", "Antwort D"],
                correctAnswerIndex: 3
            }
        }

        this.answerA = this.question.answers[0];
        this.answerB = this.question.answers[1];
        this.answerC = this.question.answers[2];
        this.answerD = this.question.answers[3];

        this.gameResults = null;
    }
    
    componentDidMount() {
        window.connection.connect()
        window.connection.socket.emit("get-answer-counts", (answerCounts) => {
            console.log(answerCounts)
            this.setState({chartData: {
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: {
                            "Antwort A": answerCounts[0],
                            "Antwort B": answerCounts[1],
                            "Antwort C": answerCounts[2],
                            "Antwort D": answerCounts[3]
                        },
                        backgroundColor: '#476D7C',
                    }
                ]
            }})
        });
        window.connection.socket.emit('get-sorted-game-results', (gameResults) => {
            console.log(gameResults)
            this.gameResults = gameResults;
        })
    }

    render() {
        return(
            <div className='tAnswerEvaluationPage'>
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
                        <Col md={{span: 2, offset: 8}}>
                            <Button
                                className="button"
                                id="button-goOn-answerEvaluationPage"
                                value="Weiter"
                                onClick={() => {
                                    this.props.navigate("/teacher/winnerAnimation", {state: {
                                        question: this.question,
                                        questionsAmount: this.questionsAmount,
                                        currentQuestionIndex: this.currentQuestionIndex,
                                        gameResults: this.gameResults
                                    }})
                                }}>
                            </Button>
                        </Col>
                    </Row>
                        <Col md={{span: 8, offset: 2}}>
                            <div id="div-HootHoot-question">
                                <Text
                                    id="HootHoot-question"
                                    value={this.question.question}>
                                </Text>
                            </div>
                        </Col>
                    <Row className="justify-content-sm-center">
                        <Col md={6}>
                            {/* <Field idField="evaluation"> */}
                                {/* Hier */}
                                {/* <div className="evaluation-diagramm"
                                    id="evaluation-diagramm-A">
                                    <Text
                                        id="evaluation-number"
                                        value="">
                                    </Text>
                                    <Text
                                        id="evaluation-letter"
                                        value="A">
                                    </Text>
                                </div> */}
                                {/* <div className="evaluation-diagramm"
                                    id="evaluation-diagramm-B">
                                    <Text
                                        id="evaluation-number"
                                        value="">
                                    </Text>
                                    <Text
                                        id="evaluation-letter"
                                        value="B">
                                    </Text>
                                </div> */}
                                {/* <div className="evaluation-diagramm"
                                    id="evaluation-diagramm-C">
                                    <Text
                                        id="evaluation-number"
                                        value="">
                                    </Text>
                                    <Text
                                        id="evaluation-letter"
                                        value="C">
                                    </Text>
                                </div> */}
                                {/* <div className="evaluation-diagramm"
                                    id="evaluation-diagramm-D">
                                    <Text
                                        id="evaluation-number"
                                        value="5">
                                    </Text>
                                    <Text
                                        id="evaluation-letter-D"
                                        value="D">
                                    </Text>
                                </div> */}
                            {/* </Field> */}
                            <Bar
                                id="barchart"
                                options={options}
                                data={this.state.chartData}>
                            </Bar>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 5, offset:1}}>
                            <div id="div-answerA-evaluation"
                                style={{opacity: this.question.correctAnswerIndex !== 0 ? '0.5': ''}}>
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="A">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value={this.answerA}>
                                    </Text>
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div id="div-answerB-evaluation"
                                style={{opacity: this.question.correctAnswerIndex !== 1 ? '0.5': ''}}>
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="B">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value={this.answerB}>
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 5, offset:1}}>
                            <div id="div-answerC-evaluation"
                                style={{opacity: this.question.correctAnswerIndex !== 2 ? '0.5': ''}}>
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="C">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value={this.answerC}>
                                    </Text>
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div id="div-answerD-evaluation"
                                style={{opacity: this.question.correctAnswerIndex !== 3 ? '0.5': ''}}>
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="D">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value={this.answerD}>
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col  md={1}>
                            <Text
                                id="answerNumber-now-overall"
                                value={(this.currentQuestionIndex + 1) + "/" + this.questionsAmount}>
                            </Text>
                        </Col>
                        {/* <Col  md={{span: 2, offset:7}}>
                            <Text
                                id="gamePIN-text"
                                value="Spiel-PIN:">
                            </Text>
                        </Col>
                        <Col>
                            <Text
                                id="gamePIN-number"
                                value="123 4567">
                            </Text>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withNavigate(t_AnswerEvaluationPage);
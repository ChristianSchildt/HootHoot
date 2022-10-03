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

const players = {'Antwort A': 1, 
                 'Antwort B': 1, 
                 'Antwort C': 0, 
                 'Antwort D': 3};


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
                                href="/teacher/winnerAnimation">
                            </Button>
                        </Col>
                    </Row>
                        <Col md={{span: 8, offset: 2}}>
                            <div id="div-HootHoot-question">
                                <Text
                                    id="HootHoot-question"
                                    value="Mit dem GUI zufrieden?">
                                </Text>
                            </div>
                        </Col>
                    <Row>
                        <Col md={{span: 8, offset: 3}}>
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
                                data={data}>
                            </Bar>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 5, offset:1}}>
                            <div id="div-answerA-evaluation">
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="A">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value="Antwort A">
                                    </Text>
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div id="div-answerB-evaluation">
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="B">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value="Antwort B">
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 5, offset:1}}>
                            <div id="div-answerC-evaluation">
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="C">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value="Antwort C">
                                    </Text>
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div id="div-answerD-evaluation">
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="D">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value="Antwort D">
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col  md={1}>
                            <Text
                                id="answerNumber-now-overall"
                                value="1/1">
                            </Text>
                        </Col>
                        <Col  md={{span: 2, offset:7}}>
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
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default t_AnswerEvaluationPage;
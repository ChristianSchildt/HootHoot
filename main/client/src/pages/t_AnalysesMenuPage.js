import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Picture from '../components/Picture';
import Text from '../components/Text';
import MenuNavigation from '../components/MenuNavigation';
import Field from '../components/Field';
import LibraryTile from '../components/LibraryTile';
import ProfileMenu from '../components/ProfileMenu';
import {Chart as ChartJS, CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../css/analyses.css';

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

const average = {'Antwort A': 4, 
                 'Antwort B': 10, 
                 'Antwort C': 1, 
                 'Antwort D': 2};


const data = {
    average,
    datasets: [
      {
        label: 'Durchschnittliche Antworten',
        data: average,
        backgroundColor: '#476D7C',
      },
    ]
};

class t_AnalysesMenuPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hoothoots: [
                {   
                    "id": 1,
                    "name": "Wie gefällt ihnen die Präsentation?",
                    "kalenderwoche": ['kw1', 'kw2']
                },
                {
                    "id": 2,
                    "name": 'Wie ist das Wetter?',
                    "kalenderwoche": ['kw1', 'kw2']
                },
                {
                    "id": 3,
                    "name": 'Was ist der Sinn des Lebens?',
                    "kalenderwoche": ['kw1']
                },
                {
                    "id": 4,
                    "name": 'Welche Fragen kann man noch stellen?',
                    "kalenderwoche": ['kw1']
                }               
            ]
        };
    }
    
    render() {
    return(
        <div className='tAnalysesMenuPage'>
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

                        <Col md={7}>
                            <MenuNavigation className="menu-navigation"/>
                        </Col>
                        <Col md={{ span: 2, offset: 1}}>
                            <ProfileMenu/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span:3, offset: 1}}>
                            <Field classNameField="analyse-question-field"
                                classNameTitle="analyse-question-field-title"
                                valueTitle="Fragen">
                                {this.state.hoothoots.map((hoothoot) => (  
                                    <LibraryTile key={hoothoot.id.toString()} classNameLibrarytext="librarytext" valuetext={hoothoot.name} /> 
                                ))}
                            </Field>
                        </Col>
                        <Col>
                            <Field classNameField="analyse-field"
                                classNameTitle="analyse-field-title"
                                valueTitle="Analyse">
                                    <Bar
                                        id="analysebarchart"
                                        options={options}
                                        data={data}>
                                </Bar>
                                <Col>
                                <Field classNameField="average-time"
                                classNameTitle="analyse-field-title"
                                valueTitle="Average Time">
                                <div id="div-average-time">
                                    <Text
                                        id="div-average-time-count"
                                        value="12">
                                    </Text>
                                </div>
                                </Field>
                                </Col>
                                <Col>
                                <Field classNameField="average-vote"
                                classNameTitle="analyse-field-title"
                                valueTitle="Average Vote">
                                    <div id="div-average-vote">
                                        <Text
                                            id="div-average-vote-count"
                                            value="24">
                                        </Text>
                                    </div>
                                </Field>
                                </Col>
                            </Field>
                        </Col>
                    </Row>
                </Container>
            </div>
       );     
    }
}

export default t_AnalysesMenuPage;
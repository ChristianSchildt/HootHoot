import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Picture from '../components/Picture';
import MenuNavigation from '../components/MenuNavigation';
import Field from '../components/Field';
import AnalysesTile from '../components/AnalysesTile';
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
                 'Antwort B': 11, 
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
                    "name": "Webtechnologien 1",
                    "question":["Wann wurde der Erste PC entwickelt?","Wie ist das Wetter?"],
                    "kalenderwoche": ['kw1', 'kw2']
                },
                {
                    "id": 2,
                    "name": 'Webtechnologien 2',
                    "question":["Wie gefällt ihnen die Präsentation?","Wie viel sind Google Aktien wert?"],
                    "kalenderwoche": ['kw1', 'kw2']
                },
                {
                    "id": 3,
                    "name": 'IT-Sicherheit',
                    "question":["Wie sicher ist das Internet?","Welcher Browser ist am sichersten?"],
                    "kalenderwoche": ['kw1']
                },
                {
                    "id": 4,
                    "name": 'Betriebssysteme',
                    "question":["Wann wurde IOS entwickelt?","IOS > Android?"],
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
                        <Col xs={{span: 6, order: 1}} 
                            sm={{span: 7, order: 1}} 
                            md={{span: 8, order: 1}}
                            lg={{span: 3, order: 1}}
                            xl={{span: 3, order: 1}}
                            xxl={{span: 2, order: 1}}>
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
                        <Col xs={{span: 12, order: 3}} 
                            sm={{span: 12, order: 3}} 
                            md={{span: 12, order: 3}}
                            lg={{span: 6, order: 2}}
                            xl={{span: 6, order: 2}}
                            xxl={{span: 8, order: 2}}>
                            <MenuNavigation className="menu-navigation"
                            id2="mark"/>
                        </Col>
                        <Col xs={{span: 6, order: 2}}
                            sm={{span: 5, order: 2}} 
                            md={{span: 4, order: 2}}
                            lg={{span: 3, order: 3}}
                            xl={{span: 3, order: 3}}
                            xxl={{span: 2, order: 3}}>
                            <ProfileMenu/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span:3, offset: 1}}>
                            <Field classNameField="analyse-question-field"
                                classNameTitle="analyse-question-field-title"
                                valueTitle="Fragen">
                                {this.state.hoothoots.map((hoothoot) => (  
                                    <AnalysesTile key={hoothoot.id.toString()} classNameLibrarytext="librarytext" valuetext={hoothoot.name} questionone={hoothoot.question[0]} questiontwo={hoothoot.question[1]} /> 
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
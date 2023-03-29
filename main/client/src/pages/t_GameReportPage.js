import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Picture from '../components/Picture';
import MenuNavigation from '../components/MenuNavigation';
import Field from '../components/Field';
import ReportTile from '../components/ReportTile';
import ProfileMenu from '../components/ProfileMenu';
import {Chart as ChartJS, CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Popup from '../components/Popup';
import '../css/analyses.css';
import InputField from '../components/InputField';
import Button from '../components/Button';
import LibraryTile from '../components/LibraryTile';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const pointsCalcFunc = (time, elapsedTime) => elapsedTime == -1 ? 0: Math.round(1000 * (time - elapsedTime) / time)

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

const average = {'Antwort A': 12, 
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

class t_GameReportPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            hoothoots: [],
            currenthoothoots: [],
            currentReports: [],
            answers: [],
            barchar: {
                average,
                datasets: [
                  {
                    label: 'Durchschnittliche Antworten',
                    data: average,
                    backgroundColor: '#476D7C',
                  },
                ]
            },
        };
    }

    async componentDidMount() {
        await this.getAnalysis()
    }

    async getAnalysis() {
        try {
            const response = await fetch('http://193.175.85.52:443/api/game_result/',{
                method: "GET",
                headers: { "jwt_token": localStorage.token } 
            });
            const data = await response.json()
            console.log(data)
            
            const array = []
            data.data.gameResults.forEach(element => {
                const dateS = element.datum
                const date = new Date(dateS);

                // Format the date and time in German time pattern
                const formattedDate = date.toLocaleDateString('de-DE') + ' ' + date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
                element.datum = formattedDate;
            })

            // data.gameSession.forEach(element => {
            //     array.push(element)
            // }); 

            console.log(data.data.gameResults)
            this.setState({ hoothoots: data.data.gameResults })

            const gameDataMap = new Map();
            data.data.gameResults.forEach(element => {
                const key = element.sessionid + element.question_id
                if (!gameDataMap.has(key)) {
                    /*const dateS = element.datum
                    const date = new Date(dateS);
                    const formattedDate = date.toLocaleDateString('de-DE') + ' ' + date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });*/
                    gameDataMap.set(key, { title: element.datum, data: [element] })
                } else {
                    gameDataMap.get(key).data.push(element)
                }
            })
            this.setState({currentReports: Array.from(gameDataMap.values())})

        } catch(e) {
            console.log(e)
        }
    }
    async countAnswers(answerid){
        console.log("answerid:");
        console.log(this.state.answers);
        let a=0,b=0,c=0,d=0;
        for(let el in answerid){
            if(this.state.answers.length > 0 && this.state.currenthoothoots[el].selected_answer_id==this.state.answers[0].id){
                a++;
            }
            if(this.state.answers.length > 1 && this.state.currenthoothoots[el].selected_answer_id==this.state.answers[1].id){
                b++;
            }
            if(this.state.answers.length > 2 && this.state.currenthoothoots[el].selected_answer_id==this.state.answers[2].id){
                c++;
            }
            if(this.state.answers.length > 3 && this.state.currenthoothoots[el].selected_answer_id==this.state.answers[3].id){
                d++;
            }
        }

        const average = {'Antwort A': a, 
                 'Antwort B': b, 
                 'Antwort C': c, 
                 'Antwort D': d};

        let data = {
            average,
            datasets: [
              {
                label: 'Durchschnittliche Antworten',
                data: average,
                backgroundColor: '#476D7C',
              },
            ]
        };
  
        
        this.setState({barchar: data});

    }

    async getAnswers(questionid) {
        try {
            if (questionid !== 1) {
            const response = await fetch('http://193.175.85.52:443/api/answers/'+questionid);
            const data = await response.json()
            this.setState({answers: data})
            console.log("Answers:")
            console.log(this.state.answers)
            }
        }catch(e){
            console.log(e);
        }
    }

    async setCurrentHoothoot(idPopup,value){
        console.log("testmap")
        console.log(this.state.barchar);
        //console.log(gameDataMap)
        console.log(this.state.currentReports)
        console.log("value");
        console.log(value);
        console.log(idPopup);
        console.log(value[0].question_id);
        await this.setState({currenthoothoots: value});
        await this.getAnswers(value[0].question_id);
        await this.countAnswers(value);
        console.log(this.state.currenthoothoots);
        if(this.state.currenthoothoots.length>0){
            this.openPopup(idPopup);
        }
    }

    async openPopup(idPopup) {
        console.log(idPopup);
        document.getElementsByClassName("body-overlay")[0].classList.add("sichtbar");
        document.getElementById(idPopup).classList.add("sichtbar");
    }
    closePopup(idPopup) {
        document.getElementsByClassName("body-overlay")[0].classList.remove("sichtbar");
        document.getElementById(idPopup).classList.remove("sichtbar");
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
                            id3="mark"/>
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
                        <Col>
                            <Field classNameField="report-field"
                                classNameTitle="report-field-title"
                                valueTitle="Berichte">
                                {this.state.currentReports.map((cReport) => (
                                 <Button
                                    className="button-report" 
                                    value={cReport.title} 
                                    onClick={() => this.setCurrentHoothoot("popup-report",cReport.data)}
                                    >
                                </Button> 
                                ))}
                            </Field>
                        </Col>
                    </Row>

                    <Popup classNamePopup="reportpopup"
                        idPopup="popup-report"
                        classNameimg="reportpopup-close"
                        altImage="button-close Platzhalter"
                        srcImage="/images/button_close.png"
                        onClickImage={() => this.closePopup("popup-report")}
                        valueTitle="Zusammenfassung">
                        <Row>
                            <Col>
                                <Field classNameField="report-participant"
                                classNameTitle="analyse-question-field-title"
                                valueTitle="Teilnehmer">
                                {this.state.currenthoothoots.map((choothoot) => (
                                <LibraryTile key={choothoot.id} classNameLibrarytext="librarytext" valuetext={choothoot.name + ": " +pointsCalcFunc(20,choothoot.time)} /> 
                                ))}
                                </Field>
                                <Field classNameField="report-stats"
                                classNameTitle="analyse-question-field-title"
                                valueTitle="Statistik">               
                                    <Bar
                                            id="analysebarchart"
                                            data={this.state.barchar}>
                                    </Bar>
                                <Field classNameField="vote-count"
                                        classNameTitle="analyse-field-title"
                                        valueTitle="Vote Count">
                                        <div id="div-average-vote">
                                        <Text
                                            id="div-average-vote-count"
                                            value={this.state.currenthoothoots.length}>
                                        </Text>
                                    </div>
                                </Field>
                                </Field>  
                            </Col>
                        </Row>
                    </Popup>
                    </Container>
            </div>
       );     
    }
}

export default t_GameReportPage;
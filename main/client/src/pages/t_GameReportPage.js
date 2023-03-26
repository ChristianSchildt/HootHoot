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
            hoothoots: [{}],
            currenthoothoots: [{}]
        };
    }

    async componentDidMount() {
        await this.getAnalysis()
    }

    async getAnalysis() {
        try {
            const response = await fetch('http://localhost:5000/api/game_result/', {
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
            
            

        } catch(e) {
            console.log(e)
        }
    }
    async setCurrentHoothoot(idPopup,value){
        console.log("dummy");
        console.log(value);
        console.log(idPopup);
        await this.setState({currenthoothoots: value});
        console.log(this.state.currenthoothoots);
        await this.openPopup(idPopup)
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
                            <MenuNavigation className="menu-navigation"
                            id3="mark"/>
                        </Col>
                        <Col md={{ span: 2, offset: 1}}>
                            <ProfileMenu/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field classNameField="report-field"
                                classNameTitle="report-field-title"
                                valueTitle="Berichte">
                                {this.state.hoothoots.map((hoothoot) => (
                                 <Button
                                    className="button-report" 
                                    value={hoothoot.datum} 
                                    onClick={() => this.setCurrentHoothoot("popup-report",hoothoot)}>
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
                        valueTitle="Bericht">
                    
                        <Field classNameField="report-participant"
                                classNameTitle="analyse-question-field-title"
                                valueTitle="Teilnehmer">
                                {this.state.hoothoots.map((choothoot) => (
                                <LibraryTile key="dummy" classNameLibrarytext="librarytext" valuetext="dummy" /> 
                                ))}
                        </Field> 
                        <Field classNameField="report-stats"
                                classNameTitle="analyse-question-field-title"
                                valueTitle="Statistik">
                                {this.state.hoothoots.map((choothoot) => (
                                    <Bar
                                        id="analysebarchart"
                                        options={options}
                                        data={data}>
                                    </Bar>
                                ))}
                        </Field>   

                    </Popup>
                    </Container>
            </div>
       );     
    }
}

export default t_AnalysesMenuPage;
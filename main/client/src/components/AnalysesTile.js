import React from 'react';
import '../css/analyses.css';
import Text from './Text';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AnalysesTile extends React.Component {

  constructor(props){
    super(props);
}

render(){
    return(
    <div className="">
        <div className='curs'>
        <Container fluid>
            <Row>
                <Col>
                    <Text
                        className={this.props.classNameLibrarytext}
                        value={this.props.valuetext}>
                    </Text>
                </Col>
            </Row>
        </Container>
        </div>
        <div className='under'>
        <Container fluid>
            <Row>
                <Col>
                    <Text
                        className={this.props.classNameLibrarytext}
                        value={this.props.questionone}>
                    </Text>
                </Col>
            </Row>
        </Container>
        </div>
        <div className='under'>
        <Container fluid>
            <Row>
                <Col>
                    <Text
                        className={this.props.classNameLibrarytext}
                        value={this.props.questiontwo}>
                    </Text>
                </Col>
            </Row>
        </Container>
        </div>
    </div>
    )

}
}

export default AnalysesTile;
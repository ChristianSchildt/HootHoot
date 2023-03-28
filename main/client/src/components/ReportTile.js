import React from 'react';
import '../css/analyses.css';
import Text from './Text';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ReportTile extends React.Component {

  constructor(props){
    super(props);
}

render(){
    return(
    <div className='curs'>
        <Container fluid 
        onClick={() => this.openPopup("popup-report")}>
            <Row>
                <Col>
                    <Text
                        className={this.props.classNameLibrarytext}
                        value={this.props.valuetext}>
                    </Text>
                </Col>
           
                <Col>
                    <Text
                        className={this.props.classNameLibrarytext}
                        value={this.props.valuecourse}>
                    </Text>
                </Col>
            </Row>
        </Container>
    </div>
    )

}
}

export default ReportTile;
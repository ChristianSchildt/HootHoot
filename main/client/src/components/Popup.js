import React from 'react';
import '../css/Popup.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from './Text';
import Imagebutton from '../components/Imagebutton';

class Popup extends React.Component {
  
  render() {
    return (
        <div className={this.props.classNamePopup}
          id={this.props.idPopup}>
            <Container>
              <Row>
                <Col>
                  <Imagebutton className={this.props.classNameimg}
                    alt={this.props.altImage}
                    href={this.props.hrefImage}
                    src={this.props.srcImage}
                    onClick={this.props.onClickImage}>
                  </Imagebutton>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text className="popup-title"
                    value={this.props.valueTitle}>
                  </Text>
                </Col>
              </Row>
            {this.props.children}
            </Container>
        </div>
    )
  }
}

export default Popup;
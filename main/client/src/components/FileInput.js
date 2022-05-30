import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/FileInput.css';

class FileInput extends React.Component {
  
  render() {
    return (
        <div>
          <Row>
            <Col md={12} className="text-center">
              <input 
                  type="file" 
                  className="form-control-file"
                  id={this.props.inputId}
                  onChange={this.props.inputOnChange}>
              </input>
            </Col>
          </Row>
        </div>
    )
  }
}

export default FileInput;
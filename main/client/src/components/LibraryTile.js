import React from 'react';
import '../css/LibraryTile.css';
import Text from './Text';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class LibraryTile extends React.Component {

  constructor(props){
    super(props);
}

render(){
    return(
    <div className="librarytile">
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
    )
}
}

export default LibraryTile;
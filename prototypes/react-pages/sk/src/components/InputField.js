import React from 'react';
import ReactDOM from 'react-dom';
import '../css/InputField.css';

class InputField extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.inputRef = React.createRef();
    }

    render(){
        return(
            <input
                id={this.props.id}
                ref={this.inputRef}
                type={this.props.type}
                className="inputField"
                defaultValue={this.props.defaultValue}
                placeholder={this.props.placeholder}
                onChange={(event) => this.setState({value: event.target.value})}
                onKeyDown={this.props.onKeyDown}
                readOnly={this.props.readOnly}
            />
        )
    }

    componentDidMount() {
        // React does not support onsearch html attribute
        var el = ReactDOM.findDOMNode(this);
        el.onsearch = this.props.onsearch;
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.defaultValue !== this.props.defaultValue) {
            this.inputRef.current.value = this.props.defaultValue;
        }
    }
    
    getValue() {
        return this.state.value !== "" ? this.state.value : (this.props.defaultValue || "") 
    }
}

export default InputField;
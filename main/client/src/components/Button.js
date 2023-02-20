import React from 'react';
import { useNavigate } from "react-router-dom";
import '../css/Button.css';

function Button(props) {
  const navigate = useNavigate();
  
  const onClick = (e) => {
    if (props.onClick) {
      props.onClick(e);
    }
    if (props.href) {
      navigate(props.href)
    } 
  }

    return (
        <a  id={props.aId}>
          <button 
            className={props.className} /*Darf nicht "class" heißen*/
            id={props.id}
            type="submit"
            disabled={props.disabled}
            style={props.style}
            onClick={onClick}> 
            {props.value}
          </button>
        </a>
    )
}

export default Button;
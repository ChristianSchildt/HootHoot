//https://stackoverflow.com/questions/73170443/how-to-use-usenavigate-react-router-dom-hook-in-class-component

import React from 'react';
import { useNavigate, /* other hooks */ } from 'react-router-dom'; 

const withNavigate = WrappedComponent => props => {
  const navigate = useNavigate();
  // other hooks

  return (
    <WrappedComponent
      {...props}
      {...{ navigate, /* other hooks */ }}
    />
  );
};

export default withNavigate;
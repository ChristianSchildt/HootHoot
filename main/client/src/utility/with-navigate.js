//https://stackoverflow.com/questions/73170443/how-to-use-usenavigate-react-router-dom-hook-in-class-component

import React from 'react';
import { useNavigate, useLocation /* other hooks */ } from 'react-router-dom'; 

const withNavigate = WrappedComponent => props => {
  const navigate = useNavigate();
  const location = useLocation();
  // other hooks

  return (
    <WrappedComponent
      {...props}
      {...{ navigate, location, /* other hooks */ }}
    />
  );
};

export default withNavigate;
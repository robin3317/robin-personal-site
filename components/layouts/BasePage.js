import React from 'react';
import { Container } from 'reactstrap';

const BasePage = props => {
  const className = props.className || '';

  return(
    <Container className={`base-page ${className}`}>
      {props.children}
    </Container>
  );
}

export default BasePage;
import React from 'react';
import { CSSTransition } from 'react-transition-group';

const AnimatedCard = ({ children, index, currentIndex }) => {
  return (
    <CSSTransition
      key={index}
      classNames="card"
      in={index === currentIndex}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default AnimatedCard;
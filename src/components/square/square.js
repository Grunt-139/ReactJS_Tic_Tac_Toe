import React from 'react';
import "./square.css"

export default Square;

function Square(props) {
    return (
      <button className={props.className} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
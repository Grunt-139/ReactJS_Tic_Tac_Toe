import React from 'react';
import ReactDOM from 'react-dom';
import "./board.css"
import Square from "../square/square.js"

export default class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i].value}
          className={this.props.squares[i].className}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      var table = [];
      let i=0;
      //Addition to tutorial
      for(let r=0; r < 3; r++){
        let squares =[];
        for(let c=0; c < 3; c++){
         squares.push(this.renderSquare(i));
          i++;
        }
        table.push(<div className="board-row">{squares}</div>)
      }//Warning about unique key for arrays
  
      return (
        <div>
          {table}
        </div>
      );
    }
  }
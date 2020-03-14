import React from 'react';
import "./game.css"
import Board from "../../components/board/board.js"


//Some constants for CSS styling
const SQUARE_DEFAULT_CLASS ="square";
const SQUARE_HIGHLIGHT_CLASS ="square-hi";
const SELECTED_BUTTON ="selected-button";
const DEFAULT_BUTTON ="";
const ASCENDING ="Ascending";
const DESCENDING ="Descending";
const ASCENDING_OL = "";
const DESCENDING_OL ="reversed";

/**
 * Game component
 * Handles all logic/input for the tic tac toe game
 */
export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        order : ASCENDING
      };
  
      //initialize the squares array
      for(let i=0;i<9;i++){
        this.state.history[0].squares[i] = {value:null,className:SQUARE_DEFAULT_CLASS};
      }
    }
    
    /**
     * Handler for when player's click on the square they wish to mark
     */
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      //const squares = current.squares.slice();
  
      //Make a deep copy of the current squares
      let squares = Array(9).fill(null);
      for(let i = 0; i < current.squares.length;i++){
        squares[i] = { 
          value:current.squares[i].value,
          className:current.squares[i].className
        };
      }
         
      if (calculateWinner(squares) || squares[i].value) {
        return;
      }
   
      squares[i].value = this.state.xIsNext ? "X" : "O";
  
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  

    /**
     * Jumps to the desired step in the game history 
     */
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
  
    /**
     * Reverses the order of the game history
     */
    handleOrderChange(order){
      //Flip the order
      order = order === ASCENDING ? DESCENDING : ASCENDING;
  
      this.setState({
        order : order
      });
    }
  
    /**
     * Core function where the work is done
     */
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const curOrder = this.state.order;
  
        //Maps out all the game moves
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
          const curMove = history[move].squares;
          
          let info = [];
          for(let i = 0; i < 9; i++){
            //Addition to original tutorial
            //Displays the position of X/O's at each point in the format of 'X(Row,Column)' with a line break in between
  
            if(curMove[i].value){
              const row = Math.floor((i / 3))+1;
              const col = (i % 3)+1;
              const data = curMove[i].value + "(" + row + "," + col + ")";
              info.push(<div>{data}<br /></div>);
              
              //kicks out a warning about unique key
            
            }
          }
          //Added functionality so the current move would be bolded
            return(
              <li key={move}>
                 <button className={move===this.state.stepNumber? SELECTED_BUTTON:DEFAULT_BUTTON} onClick={()=> this.jumpTo(move)}>
                    {desc} 
                    <br /> 
                    {
                      <Board
                        squares={curMove}
                        onClick={()=>{}}
                        />
                    }
  
                    {
                        //Uncomment this line for the history to be listed as Letter{Row,Column}
                        //info
                    }
  
                 </button>
  
              </li>
            );
      });
  
      //Reverse the array if needed
     // const moves = curOrder === ASCENDING ? movesBase : movesBase.reverse();
  
      
  
      let status;
      if (winner) {
        status = "Winner: " + winner.letter;
        
        //Highlight the winning squares
        for(let i=0; i < winner.line.length; i++){
          current.squares[winner.line[i]].className = SQUARE_HIGHLIGHT_CLASS;
        }
  
      }else if(this.state.stepNumber >=9){
        status = "Draw! To play again, go back to game start :)";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>
              {status}
            </div>
            <button onClick={ ()=>this.handleOrderChange(curOrder) }>{curOrder}</button>
            <ol className={curOrder === ASCENDING ? ASCENDING_OL : DESCENDING_OL}>
              {moves}
            </ol>
          </div>
        </div>
      );
    }
  }

  /**
    * Calculates if there has been a winner or not yet
   */
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
        return {letter:squares[a].value, line:lines[i]};
      }
    }
    return null;
  }
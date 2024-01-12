import { useState } from "react";
import "./Board.css";

const WIDTH = 40;

function Board( {n, getBoard, playerMove, switchPlayers} ) {
  const [board, setBoard] = useState(Array.from({length: n}, () => new Array(n).fill("")));

  const rowSize = {
    height: `${Math.round(WIDTH/n)}vw`,
    width: `${WIDTH}vw`,
    // paddingLeft: `${Math.round((100- WIDTH)/2)}vw`
  }

  const boxSize = {
    height: `${Math.round(WIDTH/n)-2}vw`,
    width: `${Math.round(WIDTH/n)-2}vw`,
    fontSize: `${Math.round(WIDTH/(n* 3))}vw`
  }

  const handleMove = (location) => {
    setBoard((board) => {
      const newBoard = board.map((row) => [...row])
      newBoard[location[0]][location[1]] = playerMove;
      return newBoard;
    })
    switchPlayers();
  }

  return (
    <div className='board-container'>
      {board.map((row, i) => {
        return (
          // each row is a div for styling
          <div key={`row-${i}`} style={rowSize} className='row'>
            {row.map((item, j)=> {
              // returns each box in the matrix
              return (
                <div 
                  key={`item-${i}-${j}`}
                  style={boxSize} 
                  className='box'
                  onClick={() => handleMove([i, j])}
                >
                    {item}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  );
}

export default Board;
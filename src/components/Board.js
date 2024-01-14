import { useState } from "react";
import "./Board.css";

const WIDTH = 40;

function Board( {n, getBoard, playerMove, switchPlayers} ) {
  const [board, setBoard] = useState(Array.from({length: n}, () => new Array(n).fill("")));

  const rowSize = {
    height: `${Math.round(WIDTH/n)}vw`,
    width: `${WIDTH}vw`,
  }

  const boxSize = {
    height: `${Math.round(WIDTH/n)-2}vw`,
    width: `${Math.round(WIDTH/n)-2}vw`,
    fontSize: `${Math.round(WIDTH/(n* 3))}vw`
  }

  const isWinningRow = (row) => {
    if (row[0] === "") {
      return false;
    }
    const firstPiece = row[0];
    for (let i = 1; i < n; i++) {
      if (i !== firstPiece) {
        return false
      }
    }
    return true
  }

  const isWinningColumn = (board, col) => {
    if (board[0][col] === "") {
      return false;
    }
    const firstPiece = board[0][col];
    for (let i = 1; i < n; i++) {
      if (board[i][col] !== firstPiece) {
        return false;
      }
    }
    return true;
  }

  const getWinner = (board) => {
    for (let i = 0; i < n; i++) {
      if (isWinningRow(board[i])) {
        return board[i][0];
      }
      if (isWinningColumn(board, i)) {
        return board[0][i];
      }
    }
    return null;
  }

  const handleMove = (location) => {
    setBoard((board) => {
      const newBoard = board.map((row) => [...row])
      newBoard[location[0]][location[1]] = playerMove;
      if (getWinner(newBoard) !== null) {
        console.log(`We have a winner ${getWinner(newBoard)}`)
      }
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
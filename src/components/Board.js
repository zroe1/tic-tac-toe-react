import { useEffect, useState } from "react";
import "./Board.css";

// const WIDTH = 40;

function Board( {n, playerMove, setXWins, setOWins, switchPlayers, addWins} ) {
  const [board, setBoard] = useState(Array.from({length: n}, () => new Array(n).fill("")));
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize)
  }, [])

  let WIDTH = 40;
  if (width < height) {
    WIDTH = 80;
  }

  const rowSize = {
    height: `${Math.round(WIDTH/n)}vw`,
    width: `${WIDTH}vw`,
  }

  const boxSize = {
    height: `${width > 700 ? Math.round(WIDTH/n)-2 : Math.round(WIDTH/n)-2 - 5}vw`,
    width: `${width > 700 ? Math.round(WIDTH/n)-2 : Math.round(WIDTH/n)-2 - 5}vw`,
    fontSize: `${Math.round(WIDTH/(n* 3))}vw`
  }

  const resetBoard = () => {
    for (let i = 0; i < n;  i++) {
      for (let j = 0; j < n; j++) {
        board[i][j] = "";
      }
    }
  }

  const isWinningRow = (row) => {
    if (row[0] === "") {
      return false;
    }
    const firstPiece = row[0];
    for (let i = 1; i < n; i++) {
      if (row[i] !== firstPiece) {
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

    let isForwardDiagonal = true;
    let isBackwardDiagonal = true;
    if (board[0][0] === "") {isBackwardDiagonal = false;}
    if (board[0][n - 1] === "") {isForwardDiagonal = false;}
    // loop to check for diagonals
    for (let i = 0; i < n; i++) {
      if (board[i][i] !== board[0][0]) {
        isBackwardDiagonal = false;
      }
      if (board[i][n - i - 1] !== board[0][n - 1]) {
        isForwardDiagonal = false
      }
    }
    
    if (isBackwardDiagonal) {
      return board[0][0]
    }
    if (isForwardDiagonal) {
      return board[0][n - 1]
    }

    return null;
  }

  const isDraw = (board) => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === "") {
          return false
        }
      }
    }
    return true
  }

  const handleMove = (location) => {
    if (board[location[0]][location[1]] !== "") {
      alert("illegal move: choose an empty location");
      return;
    }

    setBoard((board) => {
      const newBoard = board.map((row) => [...row])
      newBoard[location[0]][location[1]] = playerMove;
      return newBoard;
    })
    switchPlayers();
  }

  useEffect(() => {
    const winner  = getWinner(board);
    if (winner !== null) {
      resetBoard()
      console.log(`We have a winner ${getWinner(board)}`);
      if (winner === 'X') {
        setXWins()
      } else {
        setOWins()
      }
      addWins(winner)
    } else if (isDraw(board)) {
      resetBoard()
      console.log("We have a draw");
    }
  }, [board])

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
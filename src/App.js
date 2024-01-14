import './App.css';
import Board from "./components/Board"
import { useState } from "react";


function App({n}) {
  const [playerMove, setPlayerMove] = useState("X")
  const [xWins, setXWins] = useState(0);
  const [yWins, setOWins] = useState(0);
  const [winRecord, setWinReccord] = useState([])
  const [gameNum, setGameNum] = useState(1)

  const incrementXWins = () => {
    setXWins((wins => wins + 1))
  }
  const incrementOWins = () => {
    setOWins((wins => wins + 1))
  }
  const addToWinReccord = (winner) => {
    setWinReccord((record) => [`Game ${gameNum}: ${winner}`, ...record])
    setGameNum(game => ++game)
  }

  const swapPlayers = () => {
    setPlayerMove(playerMove => {
      if (playerMove === "X") {
        return "O"
      } else {
        return "X"
      }
    })
  }

  return (
    <div className='container'>
      <h1>tic-tac-toe</h1>
      <Board 
        n={n}
        playerMove={playerMove}
        switchPlayers={swapPlayers}
        setXWins={incrementXWins}
        setOWins={incrementOWins}
        addWins={addToWinReccord}
      /> 
      <p>Player Turn: {playerMove}</p>
      <div className='win-counts'>
        <p style={{marginRight: "10px"}}>X wins: {xWins}</p>
        <p style={{marginLeft: "10px"}}>O wins: {yWins}</p>
      </div>
      {winRecord.map((record, i) => {
        return (
          <li key={i}>{record}</li>
        )
      })}
    </div>
  )
}

export default App;

import './App.css';
import Board from "./components/Board"
import { useState } from "react";


function App({n}) {
  const [playerMove, setPlayerMove] = useState("X")
  const [xWins, setXWins] = useState(0);
  const [yWins, setOWins] = useState(0);

  const incrementXWins = () => {
    setXWins((wins => wins + 1))
  }
  const incrementOWins = () => {
    setOWins((wins => wins + 1))
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
      /> 
      <p>Player Turn: {playerMove}</p>
      <div className='win-counts'>
        <p style={{marginRight: "10px"}}>X wins: {xWins}</p>
        <p style={{marginLeft: "10px"}}>O wins: {yWins}</p>
      </div>
    </div>
  )
}

export default App;

import './App.css';
import Board from "./components/Board"
import { useState } from "react";


function App({n}) {
  const printBoard = (b) => {
    console.log(b);
    console.log("hello world")
  }
  const [playerMove, setPlayerMove] = useState("X")

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
      <Board n={n} getBoard={printBoard} playerMove={playerMove} switchPlayers={swapPlayers}/> 
      <p>Player Turn: {playerMove}</p>
    </div>
  )
}

export default App;

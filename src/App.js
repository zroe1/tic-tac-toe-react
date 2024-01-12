import './App.css';
import { useState } from "react"

function App({n}) {
  const [board, setBoard] = useState(Array.from({length: n}, () => new Array(n).fill("")));

  const rowSize = {
    height: `${Math.round(60/n)}vw`
  }
  console.log(rowSize.height);

  const boxSize = {
    height: `${Math.round(60/n)-2}vw`,
    width: `${Math.round(60/n)-2}vw`
  }

  return (
    <div className='board-container'>
      {board.map((row) => {
        return (
          <div style={rowSize} className='row'>
            {row.map((item)=> {
              return (
                <div style={boxSize} className='box'>{item}</div>
              )
            })}
          </div>
        )
      })}
    </div>

  );
}

export default App;

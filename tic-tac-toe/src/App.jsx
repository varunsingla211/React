import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYERS = {
  X: "Player1",
  O: "Player2"
}

function deriveWinner(gameBoard, players){
  let winner = null
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      console.log('Winner', firstSquareSymbol)
      winner = players[firstSquareSymbol]
    }
  }
  return winner
}

function deriveGameBoard(gameTurns){
  let gameBoard = initialGameBoard

  for(const turn of gameTurns){
    const {square, player} = turn 
    const {row, col} = square

    gameBoard[row][col] = player
  }

  return gameBoard
}


function deriveActivePlayer(gameTurns){
  let activePlayer = 'X'
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    activePlayer = 'O'
  }
  return activePlayer
}

function App() {
  
  const [players, setPlayers] = useState(PLAYERS) 
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)
  let gameBoard = deriveGameBoard(gameTurns)
  let winner = deriveWinner(gameBoard, players)
  
  function handleSelectSquare(rowIndex, colIndex, ){
    setGameTurns((prevTurns) => {

      let currentPlayer = deriveActivePlayer(prevTurns)
      

      const updatedTurns = [
        {square : {row:rowIndex, col:colIndex}, player: currentPlayer}, 
        ...prevTurns
      ];

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="Game container">

        <ol id="Players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {winner && <GameOver winner={winner}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare}
          board = {gameBoard}
        />

      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App

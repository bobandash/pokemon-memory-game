import { useState } from 'react'
import GAME_STATUS from './data/game-status'
import HomePage from './pages/home/home';
import HomeIcon from './components/home-icon';
import DIFFICULTY_SELECTED from './data/difficulty';
import '@fortawesome/fontawesome-free';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.NOT_STARTED)
  const [difficultySelected, setDifficultySelected] = useState(DIFFICULTY_SELECTED.NONE);

  function handleStartGame(){
    setGameStatus(GAME_STATUS.IN_PROGRESS);
  }

  function handleSetDifficulty(difficulty){
    setDifficultySelected(difficulty);
  }

  function handleNavHomePage(){
    setGameStatus(GAME_STATUS.NOT_STARTED);
  }

  return (
    <>
    <HomeIcon handleClick = {handleNavHomePage} />
{/*       depending on the game status, the game is rendered accordingly */}
      {(gameStatus === GAME_STATUS.NOT_STARTED) && <HomePage handleSetDifficulty = {handleSetDifficulty} difficultySelected = {difficultySelected} handleStartGame = {handleStartGame}/>}
    </>
  )
}

export default App

import { useState } from 'react'
import GAME_STATUS from './data/game-status'
import HomePage from './pages/home/home';
import HomeIcon from './components/home-icon';
import SoundIcon from './components/sound-icon';
import DIFFICULTY_SELECTED from './data/difficulty';
import Game from './pages/game/game';
import IconContainer from './components/icon-container';
import '@fortawesome/fontawesome-free';
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.NOT_STARTED)
  const [difficultySelected, setDifficultySelected] = useState(DIFFICULTY_SELECTED.NONE);
  const [highScore, setHighScore] = useState({
      'EASY': 0,
      'MEDIUM': 0,
      'HARD': 0
  })
  const [isSoundEnabled, setSoundEnabled] = useState(true);

  function handleStartGame(){
    setGameStatus(GAME_STATUS.IN_PROGRESS);
  }

  function handleWinGame(){
    setGameStatus(GAME_STATUS.WON);
  }

  function handleLoseGame(){
    setGameStatus(GAME_STATUS.LOST);
  }

  function handleSetDifficulty(difficulty){
    setDifficultySelected(difficulty);
  }

  function handleNavHomePage(){
    setGameStatus(GAME_STATUS.NOT_STARTED);
  }

  function updateHighScore(newScore){
    setHighScore({...highScore, [difficultySelected]: newScore});
  }

  function handleSetSound(){
    setSoundEnabled(!isSoundEnabled);
  }

  return (
    <>
    <IconContainer>
      <HomeIcon handleClick = {handleNavHomePage} />
      <SoundIcon handleClick = {handleSetSound} isSoundEnabled = {isSoundEnabled}/>
    </IconContainer>
{/*       depending on the game status, the game is rendered accordingly */}
      {(gameStatus === GAME_STATUS.NOT_STARTED) && <HomePage handleSetDifficulty = {handleSetDifficulty} difficultySelected = {difficultySelected} handleStartGame = {handleStartGame} isSoundEnabled = {isSoundEnabled}/>}
      {(gameStatus !== GAME_STATUS.NOT_STARTED) &&
        <Game difficultySelected = {difficultySelected}
              highScore = {highScore}
              gameStatus = {gameStatus}
              handleWinGame = {handleWinGame}
              handleLoseGame = {handleLoseGame}
              updateHighScore = {updateHighScore}
              handleNavHomePage = {handleNavHomePage}
              handleStartGame = {handleStartGame}
              isSoundEnabled = {isSoundEnabled}
          />}
    </>
  )
}

export default App

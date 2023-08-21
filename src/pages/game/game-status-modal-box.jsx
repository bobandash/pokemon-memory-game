import GAME_STATUS from "../../data/game-status"
import loseGif from '../../assets/lose-image.gif';
import winGif from '../../assets/win-image.gif';
import PropTypes from 'prop-types'
import PokemonTextBox from '../../components/pokemon-text-box'

function GameStatusModalBox({gameStatus, handleNavHomePage, handleRestartGame}){
  return (
    <div className = "game-status">
      {gameStatus === GAME_STATUS.LOST && 
      <>
        <PokemonTextBox>
          <h1 className = "game-status-text">You blacked out... Would you like to try again?</h1>
        </PokemonTextBox>
        <img className = "game-status-image" src = {loseGif} />
        <div className = "buttons-container">
          <button onClick = {handleNavHomePage}><i className="fa-solid fa-house"></i></button>
          <button onClick = {handleRestartGame}>Try Again</button>
        </div>
      </>}
      {gameStatus === GAME_STATUS.WON &&
      <>
        <PokemonTextBox>
          <h1 className = "game-status-text">Congratulations Trainer! You are the world champion!</h1>
        </PokemonTextBox>
        <img className = "game-status-image" src = {winGif} />
        <div className = "buttons-container">
          <button onClick = {handleNavHomePage}><i className="fa-solid fa-house"></i></button>
          <button onClick = {handleRestartGame}>Play Again</button>
        </div>
      </>}
    </div>
  )
}

GameStatusModalBox.propTypes = {
  gameStatus: PropTypes.integer,
  handleNavHomePage: PropTypes.func,
  handleRestartGame: PropTypes.number,
}

export default GameStatusModalBox
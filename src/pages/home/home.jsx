import HomePageContainer from './home-page-container';
import GameName from './game-name'
import PokemonTextBox from '../../components/pokemon-text-box.jsx'
import '../../styles/home.css'
import DIFFICULTY_SELECTED from '../../data/difficulty';
import PropTypes from 'prop-types'
import HomePageBgMusic from '../../sounds/Eterna Forest.mp3'
import optionSelectMusic from '../../sounds/pokemon-option-select.mp3'

function HomePage({handleSetDifficulty, difficultySelected, handleStartGame, isSoundEnabled}) {
  function handleSetDifficultyEasy(){
    handleSetDifficulty(DIFFICULTY_SELECTED.EASY)
  }

  function handleSetDifficultyMedium(){
    handleSetDifficulty(DIFFICULTY_SELECTED.MEDIUM);
  }

  function handleSetDifficultyHard(){
    handleSetDifficulty(DIFFICULTY_SELECTED.HARD);
  }
  
  function selectModeSound(){
    let optionSelectAudio = new Audio(optionSelectMusic)
    optionSelectAudio.play();
  }

  return (
    <>
      {isSoundEnabled && 
      <audio controls autoPlay loop>
        <source src = {HomePageBgMusic} type = "audio/mpeg" />
      </audio>}
      <HomePageContainer>
        <GameName />
        <div className = "center-text-box">
          <PokemonTextBox>
              <div className = "difficulty-selection">
                {(difficultySelected === DIFFICULTY_SELECTED.EASY) ? 
                  <div>
                    <i className="fa-solid fa-caret-right black"></i>
                    <button onClick = {handleStartGame} className = "selected" data-id = "first-index" tabIndex = "1" autoFocus>Easy</button>
                  </div>
                  :
                  <button data-id = "first-index" tabIndex = "1" onFocus = {() => {
                    selectModeSound();
                    handleSetDifficultyEasy();
                  }} onClick = {handleSetDifficultyEasy}>Easy</button>
                }
                {(difficultySelected === DIFFICULTY_SELECTED.MEDIUM) ? 
                  <div>
                    <i className="fa-solid fa-caret-right black"></i>
                    <button onClick = {handleStartGame} className = "selected" tabIndex = "2" autoFocus>Medium</button>
                  </div>
                 :
                  <button tabIndex = "2" onFocus =  {() => {
                    selectModeSound();
                    handleSetDifficultyMedium();
                  }} onClick = {handleSetDifficultyMedium}>Medium</button>
                }
                {(difficultySelected === DIFFICULTY_SELECTED.HARD) ? 
                  <div>
                    <i className="fa-solid fa-caret-right black"></i>
                    <button onClick = {handleStartGame} className = "selected" tabIndex = "3" data-id = "last-index" autoFocus>Hard</button>
                  </div>
                  :
                  <button data-id = "last-index" tabIndex = "3" onFocus =  {() => {
                    selectModeSound();
                    handleSetDifficultyHard();
                  }} onClick = {handleSetDifficultyHard}>Hard</button>
                }

              </div>            
          </PokemonTextBox>
        </div>
      </HomePageContainer>
    </>
  )
}

HomePage.propTypes = {
  handleSetDifficulty: PropTypes.func,
  difficultySelected: PropTypes.string,
  handleStartGame: PropTypes.func,
  isSoundEnabled: PropTypes.bool,
}


export default HomePage;
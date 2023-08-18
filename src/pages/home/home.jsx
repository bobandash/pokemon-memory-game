import HomePageContainer from './home-page-container';
import GameName from './game-name'
import PokemonTextBox from '../../components/pokemon-text-box.jsx'
import '../../styles/home.css'
import DIFFICULTY_SELECTED from '../../data/difficulty';
import PropTypes from 'prop-types'

function HomePage({handleSetDifficulty, difficultySelected, handleStartGame}) {
  function handleSetDifficultyEasy(){
    handleSetDifficulty(DIFFICULTY_SELECTED.EASY)
  }

  function handleSetDifficultyMedium(){
    handleSetDifficulty(DIFFICULTY_SELECTED.MEDIUM);
  }

  function handleSetDifficultyHard(){
    handleSetDifficulty(DIFFICULTY_SELECTED.HARD);
  }


  //TO-DO fix the tab index when the page rerenders
  return (
    <>
      <HomePageContainer>
        <GameName />
        <div className = "center-text-box">
          <PokemonTextBox>
              <div className = "difficulty-selection">
                {(difficultySelected === DIFFICULTY_SELECTED.EASY) ? 
                  <div>
                    <i className="fa-solid fa-caret-right black"></i>
                    <button onClick = {handleStartGame} className = "selected" tabIndex = "1" autoFocus>Easy</button>
                  </div>
                  :
                  <button tabIndex = "1" onClick = {handleSetDifficultyEasy}>Easy</button>
                }
                {(difficultySelected === DIFFICULTY_SELECTED.MEDIUM) ? 
                  <div>
                    <i className="fa-solid fa-caret-right black"></i>
                    <button onClick = {handleStartGame} className = "selected" tabIndex = "2" autoFocus>Medium</button>
                  </div>
                 :
                  <button tabIndex = "2" onClick = {handleSetDifficultyMedium}>Medium</button>
                }
                {(difficultySelected === DIFFICULTY_SELECTED.HARD) ? 
                  <div>
                    <i className="fa-solid fa-caret-right black"></i>
                    <button onClick = {handleStartGame} className = "selected" tabIndex = "3" autoFocus>Hard</button>
                  </div>
                  :
                  <button tabIndex = "3" onClick = {handleSetDifficultyHard}>Hard</button>
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
  difficultySelected: PropTypes.number,
  handleStartGame: PropTypes.func,
}


export default HomePage;
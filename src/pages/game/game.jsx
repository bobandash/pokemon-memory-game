import { useEffect, useState} from "react";
import DIFFICULTY_SELECTED from "../../data/difficulty";
import GAME_STATUS from "../../data/game-status";
import PokemonTextBox from "../../components/pokemon-text-box";
import GameStatusModalBox from "./game-status-modal-box";
import '../../styles/game.css'
import Card from './card'
import { v4 as uuid } from 'uuid';
import Pokemon from './pokemon'
import PropTypes from 'prop-types'

function Game({difficultySelected, highScore, gameStatus, handleWinGame, handleLoseGame, updateHighScore, handleNavHomePage, handleStartGame}){
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinishedLoading, setIsFinishedLoading] = useState(false);
  const [fivePokemonToDisplay, setFivePokemonToDisplay] = useState([]);
  const [numGamesPlayed, setNumGamesPlayed] = useState(0);
  let numCards;
  switch(difficultySelected){
    case DIFFICULTY_SELECTED.EASY:
        numCards = 5;
      break;
    case DIFFICULTY_SELECTED.MEDIUM:
        numCards = 10;
      break;
    case DIFFICULTY_SELECTED.HARD:
        numCards = 20;
      break;
  }


  useEffect(() => {
    let numCardsProcessed = 0;
    const listOfRandomPokemon = [];
    async function getAllPokemonData(){
      const allPokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000', {mode: 'cors'})
      const allPokemonData = await allPokemonResponse.json();
      return allPokemonData;
    }

    async function getIndividualPokemon(url){
      const individualPokemonResponse = await fetch(url);
      const individualPokemonData = await individualPokemonResponse.json();
      return individualPokemonData;
    }

    async function getFilteredPokemonData(){
      const allPokemonData = await getAllPokemonData();
      const numTotalPokemon = allPokemonData.count;
      while(numCardsProcessed < numCards){
        const pokemonNumber = Math.floor(Math.random() * numTotalPokemon);
        const pokemonName = allPokemonData.results[pokemonNumber].name;
        const pokemonURL = allPokemonData.results[pokemonNumber].url;
        const individualPokemonData = await getIndividualPokemon(pokemonURL);
        const alreadyHasPokemon = (listOfRandomPokemon.filter(pokemon => pokemon.name === pokemonName).length > 0 ? true : false);
        const hasImage = (individualPokemonData.sprites.front_default !== null ? true : false)
        if(!alreadyHasPokemon && hasImage){
          listOfRandomPokemon.push(
            new Pokemon({
              name: pokemonName,
              number: pokemonNumber,
              type: individualPokemonData.types[0].type.name,
              image: individualPokemonData.sprites.front_default,
              hasBeenChosen: false,
              id: uuid()
            })
          )
          numCardsProcessed += 1;
        }
      }
      setPokemon([...listOfRandomPokemon]);
      setFivePokemonToDisplay([...listOfRandomPokemon.slice(0, 5)]);
      setIsFinishedLoading(true);     
    }

    getFilteredPokemonData();

    return () => {
      console.log("unmounted");
    };
  }, [difficultySelected, numCards, numGamesPlayed])


  // check when score updates whether game is over
  useEffect(() => {
    if(highScore[difficultySelected] < score){
      updateHighScore(score);
    }
  }, [score, highScore, difficultySelected, updateHighScore])


  // when score updates, the random five pokemon to display needs to update as well
  useEffect(() => {
    function getFiveRandomPokemon(){
      const listOfFivePokemon = [];
      const listLength = pokemon.length;
      const numPokemonNeeded = 5;
      let numPokemonHave = 0;
      while(numPokemonHave < numPokemonNeeded){
        const randomNumber = Math.floor(Math.random() * listLength);
        const randomPokemon = pokemon[randomNumber];
        const alreadyHasPokemon = (listOfFivePokemon.filter(pokemon => pokemon.id === randomPokemon.id).length === 1 ? true : false)
        if(!alreadyHasPokemon){
          if((numPokemonHave + 1) === numPokemonNeeded){
            const alreadyAllChosen = ((listOfFivePokemon.filter(pokemon => pokemon.hasBeenChosen === true).length === numPokemonHave) ? true : false);
            if(!alreadyAllChosen){
              listOfFivePokemon.push(randomPokemon);
            } else {
              const randomPokemonNotChosen = pokemon.filter(individualPokemon => individualPokemon.hasBeenChosen === false)[0];
              listOfFivePokemon.push(randomPokemonNotChosen);
            }
          } else {
            listOfFivePokemon.push(randomPokemon);
          }
          numPokemonHave += 1;
        }
      }
      return listOfFivePokemon;
    }
    
    if(!(score === 0 || score === numCards)){
      const fiveRandomPokemon = getFiveRandomPokemon();
      setFivePokemonToDisplay([...fiveRandomPokemon]);
    }
  }, [score, pokemon])

  function handleCardClick(id){
    if(gameStatus === GAME_STATUS.IN_PROGRESS){
      const pokemonClicked = pokemon.filter(individualPokemon => id === individualPokemon.id)[0];
      const hasBeenChosenBefore = pokemonClicked.hasBeenChosen;
      if(hasBeenChosenBefore){
        handleLoseGame();
      } else {
        if(score + 1 === numCards){
          handleWinGame();
        }
        setScore(score + 1);
        setPokemon(pokemon.map(individualPokemon => {
          if(id === individualPokemon.id){
            return {...individualPokemon, hasBeenChosen: true};
          }
          return individualPokemon;
        }))
      }
    }
  }

  function handleRestartGame(){
    setNumGamesPlayed(numGamesPlayed + 1);
    setScore(0);
    handleStartGame();
  }

  return (
    <>
      <div className = "scoreboard-container">
        <PokemonTextBox>
          <p>Score: {score}</p>
          <p>High Score: {highScore[difficultySelected]}</p>
        </PokemonTextBox>
      </div>
      {gameStatus === GAME_STATUS.LOST && <GameStatusModalBox gameStatus = {gameStatus} handleNavHomePage = {handleNavHomePage} handleRestartGame = {handleRestartGame} />}
      {gameStatus === GAME_STATUS.WON && <GameStatusModalBox gameStatus = {gameStatus} handleNavHomePage = {handleNavHomePage} handleRestartGame = {handleRestartGame}/>}
      {(isFinishedLoading) && 
        <div className = "card-container">
          {fivePokemonToDisplay.map(eachPokemon => <Card pokemon = {eachPokemon} key = {eachPokemon.id} handleClick = {handleCardClick}/>)}
        </div>
      }
    </>
  )
}

Game.propTypes = {
  difficultySelected: PropTypes.integer,
  highScore: PropTypes.integer,
  gameStatus: PropTypes.integer,
  handleWinGame: PropTypes.func,
  handleLoseGame: PropTypes.func,
  updateHighScore: PropTypes.func,
  handleNavHomePage: PropTypes.func,
  handleStartGame: PropTypes.func
}


export default Game;
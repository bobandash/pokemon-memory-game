import { useEffect, useState} from "react";
import DIFFICULTY_SELECTED from "../../data/difficulty";
import GAME_STATUS from "../../data/game-status";
import PokemonTextBox from "../../components/pokemon-text-box";
import GameStatusModalBox from "./game-status-modal-box";
import '../../styles/game.css'
import Card from './card'
import { v4 as uuid } from 'uuid';
import Pokemon from './pokemon'

function Game({difficultySelected, handleHighScore, highScore, gameStatus}){
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinishedLoading, setIsFinishedLoading] = useState(false);
/*   const [fivePokemonToDisplay, setFivePokemonToDisplay] = useState(0); */


  useEffect(() => {
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
        if(!alreadyHasPokemon){
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
      setIsFinishedLoading(true);        
    }

    getFilteredPokemonData();

    return () => {
      console.log("unmounted");
    };
  }, [difficultySelected])

  return (
    <>
      <div className = "scoreboard-container">
        <PokemonTextBox>
          <p>Score: {score}</p>
          <p>High Score: {highScore[difficultySelected]}</p>
        </PokemonTextBox>
      </div>
      {gameStatus === GAME_STATUS.LOST && <GameStatusModalBox gameStatus = {gameStatus}/>}
      {gameStatus === GAME_STATUS.WON && <GameStatusModalBox gameStatus = {gameStatus}/>}
      {!isFinishedLoading && <h1>Loading</h1>}
      {isFinishedLoading && 
        <div className = "card-container">
          <h1>Finished Loading</h1>
          {pokemon.map(eachPokemon => <Card pokemon = {eachPokemon} key = {eachPokemon.id}/>)}
        </div>
      }


    </>
  )
}

export default Game;
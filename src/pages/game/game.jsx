import { useEffect, useState} from "react";
import DIFFICULTY_SELECTED from "../../data/difficulty";

function Game({difficultySelected, handleHighScore}){
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    let numCardsProcessed = 0;
    let numCards;
    const listOfRandomPokemon = [];
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

    const allPokemonData = getAllPokemonData();
    allPokemonData.then(data => {
      const numTotalPokemon = data.count;
      while(numCardsProcessed < numCards){
        const randomPokemonNumber = Math.floor(Math.random() * numTotalPokemon);
        const randomPokemon = data.results[randomPokemonNumber].name;
        const randomPokemonURL = data.results[randomPokemonNumber].url;
        const alreadyHasPokemon = (listOfRandomPokemon.filter(pokemon => pokemon.name === randomPokemon).length > 0 ? true : false);
        if(!alreadyHasPokemon){
          const individualPokemonData = getIndividualPokemon(randomPokemonURL);
          individualPokemonData.then(data => {
            listOfRandomPokemon.push({
              name: randomPokemon,
              type: data.types[0].type.name,
              image: data.sprites.front_default,
              hasBeenChosen: false
            })
          })
          numCardsProcessed += 1;
        }
      }
      setPokemon(listOfRandomPokemon);
    })
  }, [difficultySelected])
}

export default Game;
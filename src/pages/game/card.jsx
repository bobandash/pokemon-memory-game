import '../../styles/game.css'
import PropTypes from 'prop-types'

function Card({isSoundEnabled, pokemon, handleClick, selectModeSound}){
  return (
    <div onClick = {() =>  {
      handleClick(pokemon.id);
      console.log(isSoundEnabled);
      if(isSoundEnabled){
        selectModeSound();
      }
    }} className = "card">
      <img src = {pokemon.image} />
      <p className = "pokemon-name">{pokemon.name.replace("-"," ")}</p>
    </div>
  )
}

Card.propTypes = {
  pokemon: PropTypes.object,
  handleClick: PropTypes.func,
  id: PropTypes.number,
  name: PropTypes.string,
  isSoundEnabled: PropTypes.bool,
  selectModeSound: PropTypes.func
}


export default Card;
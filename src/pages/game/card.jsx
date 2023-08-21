import '../../styles/game.css'
import PropTypes from 'prop-types'

function Card({pokemon, handleClick}){
  return (
    <div onClick = {() => handleClick(pokemon.id)} className = "card">
      <img src = {pokemon.image} />
      <p className = "pokemon-name">{pokemon.name.replace("-"," ")}</p>
    </div>
  )
}

Card.propTypes = {
  pokemon: PropTypes.object,
  handleClick: PropTypes.func,
  id: PropTypes.number,
  name: PropTypes.string
}


export default Card;
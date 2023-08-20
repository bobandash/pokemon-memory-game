import '../../styles/game.css'

function Card({pokemon, handleClick}){
  return (
    <div onClick = {() => handleClick(pokemon.id)} className = "card">
      <img src = {pokemon.image} />
      <p className = "pokemon-name">{pokemon.name.replace("-"," ")}</p>
    </div>
  )
}

export default Card;
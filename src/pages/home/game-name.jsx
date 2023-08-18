import PokemonLogo from "../../assets/pokemon-logo.png"

function GameName(){
  return (
    <div className = "game-name">
      <img src = {PokemonLogo} alt = "pokemon logo"/>
    </div>
  )
}

export default GameName;
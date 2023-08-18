import '../../styles/home.css'
import PokemonLogo from "../../assets/pokemon-logo.png"

function GameName(){
  return (
    <div className = "homepage-container">
      <div className = "game-name">
        <img src = {PokemonLogo} alt = "pokemon logo"/>
      </div>
    </div>
  )
}

export default GameName;
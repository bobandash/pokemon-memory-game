import PikachuRunning from '../../assets/loading-screen-pikachu.gif'
import PokemonTextBox from '../../components/pokemon-text-box';
import '../../styles/game.css'

function LoadingScreen(){
  return (
    <>
      <div className = "loading-screen">
        <div className = "loading-animations">
          <div className = "loading-textbox-container">
            <PokemonTextBox>
              <h1>Loading...</h1>
            </PokemonTextBox>
          </div>
          <img id = "pikachu-running-gif" src = {PikachuRunning} />
        </div>
      </div>
    </>
  )
}

export default LoadingScreen;
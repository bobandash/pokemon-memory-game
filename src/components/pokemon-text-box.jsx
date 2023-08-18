import '../styles/components.css'


function PokemonTextBox({children}){
  return (
    <div className = "pokemon-outer-text-box">
      <div className = "pokemon-inner-text-box">
        {children}     
      </div>
    </div>
  )
}

export default PokemonTextBox;
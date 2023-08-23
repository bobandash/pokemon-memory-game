import '../styles/components.css'
import PropTypes from 'prop-types'

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

PokemonTextBox.propTypes = {
  children: PropTypes.object,
}

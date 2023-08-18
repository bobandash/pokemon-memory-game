import PropTypes from 'prop-types';
import Pokeball from '../assets/pokeball-icon.png'
import '../styles/components.css'

function HomeIcon({handleClick}){
  return (
    <button onClick = {handleClick} className = "home-icon">
      <img src = {Pokeball}/>
    </button>
  )  
}

HomeIcon.propTypes = {
  handleClick: PropTypes.func,
}


export default HomeIcon;
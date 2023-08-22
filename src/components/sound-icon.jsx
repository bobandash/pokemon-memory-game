import PropTypes from 'prop-types';
import '../styles/components.css'

function SoundIcon({handleClick, isSoundEnabled}){
  return (
    <button onClick = {handleClick} className = "sound-icon">
      {isSoundEnabled && <i className="fa-solid fa-volume-high"></i>}
      {!isSoundEnabled && <i className="fa-solid fa-volume-xmark"></i>}
    </button>
  )  
}

SoundIcon.propTypes = {
  handleClick: PropTypes.func,
  isSoundEnabled: PropTypes.bool
}


export default SoundIcon;
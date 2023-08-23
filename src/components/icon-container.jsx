import '../styles/components.css'
import PropTypes from 'prop-types';

function IconContainer({children}){
  return <>
    <div className = "icon-container">
      {children}
    </div>
  </>
}

IconContainer.propTypes = {
  children: PropTypes.array,
}

export default IconContainer;
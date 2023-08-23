import PropTypes from 'prop-types'

function HomePageContainer({children}){
  return(
    <div className = "homepage-container">
      {children}
    </div>
  )
}


HomePageContainer.propTypes = {
  children: PropTypes.array
}

export default HomePageContainer;
import React from 'react'
import Header from '../../components/Header'
import BottomNav from '../../components/BottomNav'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <div className='content'>
      {children}
    </div>
    <BottomNav />
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout

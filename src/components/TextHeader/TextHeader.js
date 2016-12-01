import React from 'react'
import './TextHeader.scss'

export const TextHeader = ({ children }) => (
  <div className='text-header'>
    {children}
  </div>
)

TextHeader.propTypes = {
  children: React.PropTypes.node
}

export default TextHeader

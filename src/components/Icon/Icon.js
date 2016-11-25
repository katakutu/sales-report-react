import React from 'react'
import './Icon.scss'

export const Icon = ({ iconName }) => (
  <i className={'icon' + ' ' + 'icon--' + iconName} />
)

Icon.propTypes = {
  iconName: React.PropTypes.String
}

export default Icon

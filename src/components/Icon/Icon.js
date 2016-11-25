import React from 'react'
import './Icon.scss'

export const Icon = ({ iconName }) => (
  <i className={'icon' + ' ' + 'icon--' + iconName}></i>
)

export default Icon

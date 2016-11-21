import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'

export const HomeView = () => (
  <div>
    <Carousel />
    <div className="u-display-none">
      <h4>Welcome!</h4>
      <img
        alt='This is a duck, because Redux!'
        className='duck'
        src={DuckImage} />
    </div>
  </div>
)

export default HomeView

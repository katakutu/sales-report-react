import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'
import SectionSpacer from '../../../components/SectionSpacer'
import CategoryList from '../../../components/CategoryList'
import MenuMore from '../../../components/MenuMore'

export const HomeView = () => (
  <div>
    <Carousel />
    <SectionSpacer>
      <i className='section-spacer__icon section-spacer__icon--percent' />
      Lihat Semua Promo
      <i className='section-spacer__icon section-spacer__icon--chevron' />
    </SectionSpacer>
    <CategoryList />
    <MenuMore />
    <div className='u-display-none'>
      <h4>Welcome!</h4>
      <img
        alt='This is a duck, because Redux!'
        className='duck'
        src={DuckImage} />
    </div>
  </div>
)

export default HomeView

import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'
import SectionSpacer from '../../../components/SectionSpacer'
import CategoryList from '../../../components/CategoryList'
import Ticker from '../../../components/Ticker'

export const HomeView = () => (
  <div>
    <Ticker perTickDuration={2} />
    <Carousel />
    <SectionSpacer>
      <i className='section-spacer__icon section-spacer__icon--percent' />
      Lihat Semua Promo
      <i className='section-spacer__icon section-spacer__icon--chevron' />
    </SectionSpacer>
    <CategoryList />
  </div>
)

export default HomeView

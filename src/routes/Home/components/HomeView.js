import React from 'react'
import './HomeView.scss'
import HeaderHome from '../../../components/HeaderHome'
import Carousel from '../../../components/Carousel'
import SectionSpacer from '../../../components/SectionSpacer'
import CategoryList from '../../../components/CategoryList'
import Ticker from '../../../components/Ticker'
import Tab from '../../../components/Tab'

export const HomeView = () => (
  <div>
    <HeaderHome />
    <Tab />
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

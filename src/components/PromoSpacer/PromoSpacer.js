import React from 'react'
import { connect } from 'react-redux'
import './PromoSpacer.scss'

import { HOSTNAME } from '../../constants'
import lang from '../../lib/utils/Lang'

export const PromoSpacer = ({ children, propLang }) => (
  <div className='u-clearfix'>
    <a href={`${HOSTNAME}/promo`} className='promo-spacer__link' target='_blank'>
      {/* <i className='promo-spacer__icon promo-spacer__icon--percent' /> */}
      { lang[propLang]['View All Promo'] }
      <i className='promo-spacer__icon promo-spacer__icon--arrow' />
      <div className='u-clearfix' />
    </a>
  </div>
)

PromoSpacer.propTypes = {
  children: React.PropTypes.node,
  propLang: React.PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    propLang: state['app'] ? state['app'].lang : state.lang
  }
}
export default connect(mapStateToProps, undefined)(PromoSpacer)

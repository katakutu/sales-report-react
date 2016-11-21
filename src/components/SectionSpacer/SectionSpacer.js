import React from 'react'
import './SectionSpacer.scss'

export const SectionSpacer = ({ children }) => (
  <div className="section-spacer">
    <a href="#" className="section-spacer__link">
      <span className="section-spacer__label">
        <i className="section-spacer__icon section-spacer__icon--percent"></i>
          {children}
        <i className="section-spacer__icon section-spacer__icon--chevron"></i>
      </span>
    </a>
  </div>
)

export default SectionSpacer

import React from 'react'
import './SectionSpacer.scss'

export const SectionSpacer = ({ children }) => (
  <div className="section-spacer">
    <a href="#" className="section-spacer__link">
      <span className="section-spacer__label">
        {children}
      </span>
    </a>
  </div>
)

export default SectionSpacer

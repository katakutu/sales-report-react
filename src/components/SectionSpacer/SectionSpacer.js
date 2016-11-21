import React from 'react'
import './SectionSpacer.scss'

export const SectionSpacer = ({ children }) => (
  <div className="section-spacer u-mb2">
    <a href="#" className="section-spacer__link">
      <span className="section-spacer__label">
        {children}
      </span>
    </a>
  </div>
)

export default SectionSpacer

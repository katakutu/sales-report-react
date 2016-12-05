import React from 'react'
import './OfficialStoreSection.scss'
import TextHeader from '../../components/TextHeader'
import ramayanaLogo from './assets/ramayana.jpg'
import centuryLogo from './assets/century.jpg'
import lunaLogo from './assets/luna.jpg'
import oppoLogo from './assets/oppo.jpg'

import { HOSTNAME } from '../../constants'

export const OfficialStoreSection = () => (
  <div className='u-clearfix official-store'>
    <TextHeader textType={1}>
      Official Store
    </TextHeader>
    <div className='official-store__content u-clearfix u-mxn1'>

      <div className='u-col u-col-3 u-px1'>
        <a href={`${HOSTNAME}/ramayana`}
          data-value='Ramayana Dept Store'
          className='official-store__link u-center'>
          <div className='u-table'>
            <div className='u-table-cell official-store__cell'>
              <img
                src={ramayanaLogo}
                alt='Ramayana'
                className='u-mx-auto u-fit u-block' />
            </div>
          </div>
        </a>
      </div>

      <div className='u-col u-col-3 u-px1'>
        <a href={`${HOSTNAME}/century-online`}
          data-value='CENTURY HEALTHCARE'
          className='official-store__link u-center'>
          <div className='u-table'>
            <div className='u-table-cell official-store__cell'>
              <img
                src={centuryLogo}
                alt='Century'
                className='u-mx-auto u-fit u-block' />
            </div>
          </div>
        </a>
      </div>

      <div className='u-col u-col-3 u-px1'>
        <a href={`${HOSTNAME}/luna`}
          data-value='LUNA OFFICIAL STORE'
          className='official-store__link u-center'>
          <div className='u-table'>
            <div className='u-table-cell official-store__cell'>
              <img
                src={lunaLogo}
                alt='Luna'
                className='u-mx-auto u-fit u-block' />
            </div>
          </div>
        </a>
      </div>

      <div className='u-col u-col-3 u-px1'>
        <a href={`${HOSTNAME}/oppo`}
          data-value='OPPO OFFICIAL STORE'
          className='official-store__link u-center'>
          <div className='u-table'>
            <div className='u-table-cell official-store__cell'>
              <img
                src={oppoLogo}
                alt='Oppo'
                className='u-mx-auto u-fit u-block' />
            </div>
          </div>
        </a>
      </div>

    </div>
  </div>
)

export default OfficialStoreSection

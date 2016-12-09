import React from 'react'
import './OfficialStoreSection.scss'
import TextHeader from '../../components/TextHeader'

import ramayanaLogo from './assets/ramayana.jpg'
import centuryLogo from './assets/century.jpg'
import lunaLogo from './assets/luna.jpg'
import oppoLogo from './assets/oppo.jpg'
import smartfrenLogo from './assets/smartfren.jpg'
import mustikaRatuLogo from './assets/mustika-ratu.jpg'

import { HOSTNAME } from '../../constants'

const stores = [
  {
    href: `${HOSTNAME}/ramayana`,
    img: ramayanaLogo,
    name: 'Ramayana',
    fullName: 'Ramayana Dept Store'
  },
  {
    href: `${HOSTNAME}/century-online`,
    img: centuryLogo,
    name: 'Century',
    fullName: 'Century Healthcare'
  },
  {
    href: `${HOSTNAME}/luna`,
    img: lunaLogo,
    name: 'Luna',
    fullName: 'Luna Official Store'
  },
  {
    href: `${HOSTNAME}/oppo`,
    img: oppoLogo,
    name: 'Oppo',
    fullName: 'Oppo Official Store'
  },
  {
    href: `${HOSTNAME}/mustika-ratu`,
    img: mustikaRatuLogo,
    name: 'Mustika Ratu',
    fullName: 'Mustika Ratu Official Store'
  },
  {
    href: `${HOSTNAME}/smartfren`,
    img: smartfrenLogo,
    name: 'Smartfren',
    fullName: 'Smartfren Official Stroe'
  }
]

const renderStore = (data, index) => (
  <div className='u-col u-col-3 u-px1' key={`os-${index}`}>
    <a href={data.href}
      data-value={data.fullName}
      className='official-store__link u-center'>
      <div className='u-table'>
        <div className='u-table-cell official-store__cell'>
          <img
            src={data.img}
            alt={`${data.name} Logo`}
            className='u-mx-auto u-fit u-block' />
        </div>
      </div>
    </a>
  </div>
)

export const OfficialStoreSection = () => (
  <div className='u-clearfix official-store'>
    <TextHeader textType={1}>
      Official Store
    </TextHeader>
    <div className='official-store__content u-clearfix u-mxn1'>
      { /* slow, but we only have 6 items so doesn't matter */ }
      { stores.sort(i => 0.5 - Math.random()).slice(0, 4).map(renderStore) }
    </div>
  </div>
)

export default OfficialStoreSection

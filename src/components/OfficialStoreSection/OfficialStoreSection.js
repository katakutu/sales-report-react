import React from 'react'
import './OfficialStoreSection.scss'
import TextHeader from '../../components/TextHeader'

export const OfficialStoreSection = () => (
  <div className='u-clearfix official-store'>
    <TextHeader>
      Official Store
    </TextHeader>
    <div className='official-store__content u-clearfix u-mxn1'>

      <div className='u-col u-col-3 u-px1'>
        <a href='#' className='official-store__link u-center'>
          <div className='u-table'>
            <div className='u-table-cell official-store__cell'>
              <img
                src='http://placehold.it/45x45'
                alt='Lorem ipsum'
                className='u-mx-auto u-fit u-block'/>
            </div>
          </div>
        </a>
      </div>

      <div className='u-col u-col-3 u-px1'>
        <a href='#' className='official-store__link u-center'>
          <div className='u-table'>
            <div className='u-table-cell official-store__cell'>
              <img
                src='http://placehold.it/50x30'
                alt='Lorem ipsum'
                className='u-mx-auto u-fit u-block'/>
            </div>
          </div>
        </a>
      </div>

      <div className='u-col u-col-3 u-px1'>
        <a href='#' className='official-store__link u-center'>
          <div className='u-table'>
            <div className='u-table-cell official-store__cell'>
              <img
                src='http://placehold.it/45x45'
                alt='Lorem ipsum'
                className='u-mx-auto u-fit u-block'/>
            </div>
          </div>
        </a>
      </div>

      <div className='u-col u-col-3 u-px1'>
        <a href='#' className='official-store__link u-center'>
          <div className='u-table'>
            <div className='u-table-cell official-store__cell'>
              <img
                src='http://placehold.it/45x40'
                alt='Lorem ipsum'
                className='u-mx-auto u-fit u-block'/>
            </div>
          </div>
        </a>
      </div>

    </div>
  </div>
)

export default OfficialStoreSection

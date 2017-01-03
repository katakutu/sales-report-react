import React from 'react'
import './Toppicks.scss'
import TextHeader from '../../components/TextHeader'
import ToppicksPlaceholder from './assets/toppicks-placeholder.png'
import ToppicksBannerPlaceholder from './assets/toppicks-banner-placeholder.png'

export const Toppicks = () => (
  <div className='u-clearfix'>
    <TextHeader textType={2} injectClassName='toppicks__title'>
      Top Picks
    </TextHeader>
    <div className='u-clearfix toppicks-container'>
      <div className='toppicks__contents'>
        <div className='toppicks__row u-clearfix'>
          <div className='u-col u-col-6 toppicks__box'>
            <a href='#'>
              <div className='toppicks__banner'>
                <img src={ToppicksBannerPlaceholder} alt='' className='toppicks__img' />
              </div>
            </a>
          </div>
          <div className='u-col u-col-6 toppicks__box'>
            <div className='toppicks__box-content'>
              <a href='#'>
                <img src={ToppicksPlaceholder} alt='' className='toppicks__img' />
                <div className='toppicks__content-desc'>
                  <div className='toppicks__content-title u-truncate'>Munafie Slimming Pants</div>
                  <div className='toppicks__content-startto u-truncate'>Mulai dari
                    <span className='toppicks__content-price'>Rp. 350rb</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className='toppicks__row u-clearfix'>
          <div className='u-col u-col-6 toppicks__box'>
            <div className='toppicks__box-content'>
              <a href='#'>
                <img src={ToppicksPlaceholder} alt='' className='toppicks__img' />
                <div className='toppicks__content-desc'>
                  <div className='toppicks__content-title u-truncate'>Munafie Slimming Pants</div>
                  <div className='toppicks__content-startto u-truncate'>Mulai dari
                    <span className='toppicks__content-price'>Rp. 350rb</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className='u-col u-col-6 toppicks__box'>
            <div className='toppicks__box-content'>
              <a href='#'>
                <img src={ToppicksPlaceholder} alt='' className='toppicks__img' />
                <div className='toppicks__content-desc'>
                  <div className='toppicks__content-title u-truncate'>Munafie Slimming Pants</div>
                  <div className='toppicks__content-startto u-truncate'>Mulai dari
                    <span className='toppicks__content-price'>Rp. 350rb</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className='toppicks__see-all'>
          <a className='toppicks__see-all-link' href='https://www.tokopedia.com/toppicks/'>
            Lihat Semua <i className='promo-spacer__icon promo-spacer__icon--arrow' />
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default Toppicks

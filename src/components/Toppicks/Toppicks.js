import React from 'react'
import './Toppicks.scss'

export const Toppicks = () => (
  <div className='u-clearfix toppicks-container'>
    <h2 className='text-header'>Top Picks</h2>
    <div className='toppicks__contents'>
      <div className='toppicks__row u-clearfix'>
        <div className='u-col u-col-6 toppicks__box'>
          <a href='#'>
            <div className='toppicks__banner'>
              <img src='http://placehold.it/720x720' alt='' className='toppicks__img' />
            </div>
          </a>
        </div>
        <div className='u-col u-col-6 toppicks__box'>
          <div className='toppicks__box-content'>
            <a href='#'>
              <img src='http://placehold.it/720x520' alt='' className='toppicks__img' />
              <div className='toppicks__content-desc'>
                <div className='title u-truncate'>Munafie Slimming Pants</div>
                <div className='startto u-truncate'>Mulai dari <span className='price'>Rp. 350rb</span></div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className='toppicks__row u-clearfix'>
        <div className='u-col u-col-6 toppicks__box'>
          <div className='toppicks__box-content'>
            <a href='#'>
              <img src='http://placehold.it/720x520' alt='' className='toppicks__img' />
              <div className='toppicks__content-desc'>
                <div className='title u-truncate'>Munafie Slimming Pants</div>
                <div className='startto u-truncate'>Mulai dari <span className='price'>Rp. 350rb</span></div>
              </div>
            </a>
          </div>
        </div>
        <div className='u-col u-col-6 toppicks__box'>
          <div className='toppicks__box-content'>
            <a href='#'>
              <img src='http://placehold.it/720x520' alt='' className='toppicks__img' />
              <div className='toppicks__content-desc'>
                <div className='title u-truncate'>Munafie Slimming Pants</div>
                <div className='startto u-truncate'>Mulai dari <span className='price'>Rp. 350rb</span></div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className='toppicks__see-all'>
        <a className='toppicks__see-all-link' href='https://www.tokopedia.com/toppicks/'>
          Lihat semua <i className='promo-spacer__icon promo-spacer__icon--arrow' />
        </a>
      </div>
    </div>
  </div>
)

export default Toppicks

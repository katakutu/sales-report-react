import React, { Component } from 'react'
import './HotListView.scss'
import HeaderHomeOld from '../../../components/HeaderHomeOld'

class HotListView extends Component {
  render () {
    return (
      <div>
        <HeaderHomeOld tabIsAvailable />
        <div className='u-clearfix hotlist hotlist--single-page u-mt2'>
          {/* Remove class u-display-none, If you want to see the breadcrumb.
            The Breadcrumb appears after you clicked a link "lihat semua".
            For example you can check to https://m.tokopedia.com/hot?view=1
          */}
          <div className='breadcrumb u-truncate u-display-none'>
            <a className='link-green' href='#'>« Kembali</a>
          </div>
          <h1 className='text-header text-header-green u-center'>Hot list</h1>

          <div className='hotlist__item'>
            <div className='hotlist__wrapper'>
              <a aria-hidden='true' tabIndex='-1' href='#' className='hotlist__click u-block' />
              <img src='https://placehold.it/375x196?text=+' className='u-fit u-block u-mx-auto' alt='' />
              <div className='hotlist__footer u-clearfix u-mt1'>
                <div className='u-clearfix'>
                  <div className='u-col u-col-5 u-truncate u-relative'>
                    <a aria-hidden='true' tabIndex='-1' href='#' className='hotlist__click u-block' />
                    <span className='hotlist__name u-bold'>Lorem Ipsum</span>
                  </div>
                  <div className='u-col u-col-7 u-right-align u-relative'>
                    <a aria-hidden='true' tabIndex='-1' href='#' className='hotlist__click u-block' />
                    <small className='hotlist__start-from u-mr1'>Mulai dari:</small>
                    <span className='hotlist__price u-bold'>Rp 500rb</span>&nbsp;&rsaquo;
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='hotlist-showall'>
            <a className='link-green' href='#'>
              Lihat semua &rsaquo;
            </a>
          </div>
          {/* Remove class u-display-none, If you want to see the pagination.
            The Pagination appears after you clicked a link "lihat semua".
            For example you can check to https://m.tokopedia.com/hot?view=1
          */}
          <div className='pagination u-center'>
            <ul>
              <li><a href='#'>«</a></li>
              <li><a href='#'>1</a></li>
              <li className='active'><a href='#'>2</a></li>
              <li><a href='#'>3</a></li>
              <li><a href='#'>4</a></li>
              <li><a href='#'>5</a></li>
              <li><a href='#'>»</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default HotListView

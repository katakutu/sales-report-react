import React, { Component } from 'react'
import './HotListView.scss'
import HeaderHomeOld from '../../../components/HeaderHomeOld'

class HotListView extends Component {
  render () {
    return (
      <div>
        <HeaderHomeOld />
        <div className='u-clearfix hotlist-holder'>
          {/* Remove class u-display-none, If you want to see the breadcrumb.
            The Breadcrumb appears after you clicked a link "lihat semua".
            For example you can check to https://m.tokopedia.com/hot?view=1
          */}
          <div className='breadcrumb u-truncate u-display-none'>
            <a className='link-green' href='#'>« Kembali</a>
          </div>
          <h1 className='text-header text-header-green u-center'>Hot list</h1>
          <div className='hotlist__item'>
            <a href='#'>
              <img className='hotlist__item-img' src='http://placehold.it/375x196' />
              <div className='hotlist__captions u-clearfix'>
                <div className='u-col u-col-6'>
                  <div className='hotlist__captions-name u-bold'>
                    Glow Stick
                  </div>
                </div>
                <div className='u-col u-col-6 u-right-align'>
                  <small className='hotlist__start-from'>Mulai dari</small>&nbsp;
                  <span className='hotlist__price'>Rp 5rb</span>
                  <i className='more-info__arrow' />
                </div>
              </div>
            </a>
          </div>
          <div className='hotlist__item'>
            <a href='#'>
              <img className='hotlist__item-img' src='http://placehold.it/375x196' />
              <div className='hotlist__captions u-clearfix'>
                <div className='u-col u-col-6'>
                  <div className='hotlist__captions-name u-bold'>
                    Glow Stick
                  </div>
                </div>
                <div className='u-col u-col-6 u-right-align'>
                  <small className='hotlist__start-from'>Mulai dari</small>&nbsp;
                  <span className='hotlist__price'>Rp 5rb</span>
                  <i className='more-info__arrow' />
                </div>
              </div>
            </a>
          </div>
          <div className='hotlist__item'>
            <a href='#'>
              <img className='hotlist__item-img' src='http://placehold.it/375x196' />
              <div className='hotlist__captions u-clearfix'>
                <div className='u-col u-col-6'>
                  <div className='hotlist__captions-name u-bold'>
                    Glow Stick
                  </div>
                </div>
                <div className='u-col u-col-6 u-right-align'>
                  <small className='hotlist__start-from'>Mulai dari</small>&nbsp;
                  <span className='hotlist__price'>Rp 5rb</span>
                  <i className='more-info__arrow' />
                </div>
              </div>
            </a>
          </div>
          <div className='hotlist__item'>
            <a href='#'>
              <img className='hotlist__item-img' src='http://placehold.it/375x196' />
              <div className='hotlist__captions u-clearfix'>
                <div className='u-col u-col-6'>
                  <div className='hotlist__captions-name u-bold'>
                    Glow Stick
                  </div>
                </div>
                <div className='u-col u-col-6 u-right-align'>
                  <small className='hotlist__start-from'>Mulai dari</small>&nbsp;
                  <span className='hotlist__price'>Rp 5rb</span>
                  <i className='more-info__arrow' />
                </div>
              </div>
            </a>
          </div>
          <div className='hotlist__item'>
            <a href='#'>
              <img className='hotlist__item-img' src='http://placehold.it/375x196' />
              <div className='hotlist__captions u-clearfix'>
                <div className='u-col u-col-6'>
                  <div className='hotlist__captions-name u-bold'>
                    Glow Stick
                  </div>
                </div>
                <div className='u-col u-col-6 u-right-align'>
                  <small className='hotlist__start-from'>Mulai dari</small>&nbsp;
                  <span className='hotlist__price'>Rp 5rb</span>
                  <i className='more-info__arrow' />
                </div>
              </div>
            </a>
          </div>
          <div className='hotlist__item'>
            <a href='#'>
              <img className='hotlist__item-img' src='http://placehold.it/375x196' />
              <div className='hotlist__captions u-clearfix'>
                <div className='u-col u-col-6'>
                  <div className='hotlist__captions-name u-bold'>
                    Glow Stick
                  </div>
                </div>
                <div className='u-col u-col-6 u-right-align'>
                  <small className='hotlist__start-from'>Mulai dari</small>&nbsp;
                  <span className='hotlist__price'>Rp 5rb</span>
                  <i className='more-info__arrow' />
                </div>
              </div>
            </a>
          </div>
          <div className='hotlist-showall'>
            <a className='link-green' href='#'>
              Lihat semua
              <i className='more-info__arrow' />
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

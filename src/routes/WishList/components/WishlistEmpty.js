import React, { Component, PropTypes } from 'react'
import Img from 'react-image-fallback'

import emptyImage from '../assets/wishlist-empty.png'
import loading from '../../../static/media/images/lite-loading.png'

import './WishListView.scss'

class WishlistEmpty extends Component {
    render () {
        return (
            <div className='wishlist-container u-clearfix'>
                <h3 style={{textAlign: 'center'}}>Tidak ada wishlist</h3>
                <Img src={emptyImage}
                     initialImage={loading}
                     fallbackImage={loading}
                     className='u-fit u-block u-mx-auto'
                     alt='Tidak ada wishlist' />
            </div>
        )
    }
}

export default WishlistEmpty
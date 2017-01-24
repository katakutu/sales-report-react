import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import emptyImage from '../assets/wishlist-empty.png'
import loading from '../../../static/media/images/lite-loading.png'
import lang from '../../../lib/utils/Lang'
import TopAds from '../../../components/TopAds/TopAds'
import { HOSTNAME } from '../../../constants'

import './WishListView.scss'

class WishlistEmpty extends Component {
  static propTypes = {
    lang: React.PropTypes.string,
    userID: React.PropTypes.number
  }

  constructor (props) {
    super(props)

    this._eventModal = this._eventModal.bind(this)
  }

  state = {
    ep:'shop',
    src:'fav_product',
    item:2,
    page:1,
    q:'',
    modalState: false,
    modalContent: {
      data: [
        {
          icon: 'https://ecs1.tokopedia.net/img/ads_microsite/stat.png',
          title: 'Tingkatkan penjualan',
          content: `Toko dan produk anda akan lebih mudah
          ditemukan oleh pengunjung Tokopedia.`
        },
        {
          icon: 'https://ecs1.tokopedia.net/img/ads_microsite/jangkau.png',
          title: 'Menjangkau dengan tepat',
          content: `TopAds membantu Anda menjangkau calon pembeli yang sesuai, melalui
          pencarian produk dan penelusuran kategori produk.`
        },
        {
          icon: 'https://ecs1.tokopedia.net/img/ads_microsite/efektif.png',
          title: 'Efektif dan Efisien',
          content: `Dengan TopAds, hasil yang anda harapkan sesuai dengan biaya
          yang anda keluarkan.`
        }
      ],
      link: 'https://m.tokopedia.com/iklan?campaign=topads&amp;source=wishlist&amp;medium=mobile',
      linkText: 'Baca selengkapnya'
    }
  }

  _eventModal (state) {
    this.setState({
      modalState: state
    })
  }

  render () {
    return (
      <div className='u-clearfix'>
        <h3 style={{ textAlign: 'center' }}>
          {lang[this.props.lang]['Empty wishlist']}
        </h3>
        <Img src={emptyImage}
          initialImage={loading}
          fallbackImage={loading}
          className='u-block u-mx-auto wishlist__empty-img'
          alt={lang[this.props.lang]['Empty wishlist']} />
        <div className='wishlist__empty'>
          { lang[this.props.lang]['Empty wishlist'] }
        </div>
        <a href={`${HOSTNAME}/toppicks`} className='wishlist__btn-holder'>
          <div className='wishlist__lets-search'>
            { lang[this.props.lang]['Search for Products'] }
          </div>
        </a>
        <TopAds
          userID={this.props.userID}
          ep={this.state.ep}
          src={this.state.src}
          item={this.state.item}
          page={this.state.page}
          q={this.state.q}
          stateModal={this.state.modalState}
          contentModal={this.state.modalContent}
          eventModal={this._eventModal} />

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
export default (connect(mapStateToProps, undefined)(WishlistEmpty))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Img from 'react-image-fallback'

import emptyImage from '../assets/wishlist-empty.png'
import loading from '../../../static/media/images/lite-loading.png'
import lang from '../../../lib/utils/Lang'
import TopAds from '../../../components/TopAds/TopAds'
import { HOSTNAME } from '../../../constants'

import './WishListView.scss'

const TOPADS_PARAMS = {
  ep: 'product',
  src:'wishlist',
  item: 2,
  page: 1,
  q: '',
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
    modalState: false
  }

  _eventModal (state) {
    this.setState({
      modalState: state
    })
  }

  render () {
    return (
      <div className='u-clearfix'>
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
          ep={TOPADS_PARAMS.ep}
          src={TOPADS_PARAMS.src}
          item={TOPADS_PARAMS.item}
          page={TOPADS_PARAMS.page}
          q={TOPADS_PARAMS.q}
          stateModal={this.state.modalState}
          contentModal={TOPADS_PARAMS.modalContent}
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

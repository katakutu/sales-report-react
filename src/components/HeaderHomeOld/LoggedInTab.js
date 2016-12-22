import React, { Component } from 'react'
import { connect } from 'react-redux'
import TabSlider from 'react-slick'
import { Link } from 'react-router'

import { appIsLoading } from '../../store/app'
import { HOSTNAME } from '../../constants'

var settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  draggable: true,
  centerMode: false,
  variableWidth: false,
  slidesToShow: 4,
  slidesToScroll: 4
}

class LoggedInTab extends Component {
  static propTypes = {
    appIsLoading: React.PropTypes.func,
    activeTab: React.PropTypes.string
  }

  render () {
    let loadingFunc = event => this.props.appIsLoading(true)

    const homeCN = this.props.activeTab === 'home' ? 'tab-item active' : 'tab-item'
    const hlCN = this.props.activeTab === 'hotlist' ? 'tab-item active' : 'tab-item'

    return (
      <TabSlider {...settings} className='tab logged-in'>
        <div className={homeCN}>
          <label className='tab-link'>
            <Link to='/'>Home</Link>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/?view=feed_preview`} onClick={loadingFunc}>Feed</a>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/fav-shop.pl?view=1`} onClick={loadingFunc}>Favorit</a>
          </label>
        </div>
        <div className={hlCN}>
          <label className='tab-link'>
            <Link to={`/hot?page=1`}>
              Hot List
            </Link>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href={`${HOSTNAME}/?view=wishlist_preview`} onClick={loadingFunc}>Wishlist</a>
          </label>
        </div>
      </TabSlider>
    )
  }
}

const mapDispatchToProps = { appIsLoading }
export default connect(undefined, mapDispatchToProps)(LoggedInTab)

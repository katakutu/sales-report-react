import React, { Component } from 'react'
import { connect } from 'react-redux'
import TabSlider from 'react-slick'
import { Link } from 'react-router'

import { appIsLoading } from '../../store/app'
import { HOSTNAME } from '../../constants'

class LoggedInTab extends Component {
  static propTypes = {
    appIsLoading: React.PropTypes.func,
    activeTab: React.PropTypes.string
  }

  settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    draggable: true,
    centerMode: false,
    variableWidth: true,
    slidesToShow: 4,
    slidesToScroll: 2
  }

  generateAfterChange (el) {
    return (currentSlide) => {
      if (currentSlide >= 2) {
        const slideTrackEl = document.querySelector('#loggedin-tab .slick-track')
        const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        const slideEl = document.querySelector('#loggedin-tab .slick-slide')
        const slideWidth = slideEl.offsetWidth
        const slideViewportOffset = viewportWidth - slideWidth
        const paddingLeft = 29

        const maxTranslateX = (slideWidth * 2 - slideViewportOffset) + paddingLeft
        slideTrackEl.style.transform = `translate3d(${maxTranslateX}px, 0px, 0px)`

        el.slickGoTo(2)
      }
    }
  }

  state = {
    settings: this.settings
  }

  componentDidMount () {
    this.setState({
      settings: Object.assign(this.settings, {
        afterChange: this.generateAfterChange(this.refs.loginTab)
      })
    })
  }

  render () {
    let loadingFunc = event => this.props.appIsLoading(true)

    const homeCN = this.props.activeTab === 'home' ? 'tab-item active' : 'tab-item'
    const hlCN = this.props.activeTab === 'hotlist' ? 'tab-item active' : 'tab-item'

    return (
      <div id='loggedin-tab'>
        <TabSlider {...this.state.settings} ref='loginTab' className='tab logged-in'>
          <div className={homeCN}>
            <label className='tab-link'>
              <Link to='/?h=3'>Home</Link>
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
      </div>
    )
  }
}

const mapDispatchToProps = { appIsLoading }
export default connect(undefined, mapDispatchToProps)(LoggedInTab)

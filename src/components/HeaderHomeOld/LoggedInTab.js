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
        const tabWidths = Array.prototype.slice.call(
          document.querySelectorAll('#loggedin-tab .slick-slide'),
          0
        ).map(s => s.offsetWidth)

        // Move menu to the right (in variable offset)
        // based on how many menus fit on one screen.
        // Menus are moved to the right one by one based
        // on each tab's width until we reach the max point
        // we want (paddingRight)
        const paddingRight = 29
        let offset = 0
        let offsetIndex = 0
        const lastElWidth = tabWidths[tabWidths.length - 1]
        while (viewportWidth - offset > lastElWidth) {
          offset = offset + tabWidths[offsetIndex]
          offsetIndex = offsetIndex + 1
        }

        // calculate the actual translation needed
        const translateX = viewportWidth - offset 
        //const maxTranslateX = (translateX > lastElWidth) ? -1 * (lastElWidth + paddingRight) : translateX
        const remainingArr = tabWidths.slice(offsetIndex + 1)
        const maxTranslateX = remainingArr.length > 0 ? (remainingArr.reduce((a, b) => a + b) + paddingRight) : translateX + paddingRight
        slideTrackEl.style.transform = `translate3d(-${maxTranslateX}px, 0px, 0px)`

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
    const wlCN = this.props.activeTab === 'wishlist' ? 'tab-item active' : 'tab-item'

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
          <div className={wlCN}>
            <label className='tab-link'>
              <Link to='/wishlist'>Wishlist</Link>
            </label>
          </div>
        </TabSlider>
      </div>
    )
  }
}

const mapDispatchToProps = { appIsLoading }
export default connect(undefined, mapDispatchToProps)(LoggedInTab)

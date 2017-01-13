/* eslint max-len: ["error", { "ignoreStrings": true }] */
import React, { Component } from 'react'
import classnames from 'classnames'
import './Tabs.scss'
import Tab from './Tab.js'
import TabContent from './TabContent'

let xDown = null
let yDown = null
let location = 0
class Tabs extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    index: React.PropTypes.number,
    inverse: React.PropTypes.bool,
    onChange: React.PropTypes.func
  }

  static defaultProps = {
    index: 0,
    inverse: false
  }

  state = {
    pointer: {},
    arrow: {}
  }

  constructor (props) {
    super(props)

    this.handleHeaderClick = this.handleHeaderClick.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.initNavigationNode = this.initNavigationNode.bind(this)
    this.parseChildren = this.parseChildren.bind(this)
    this.renderContents = this.renderContents.bind(this)
    this.renderHeaders = this.renderHeaders.bind(this)
    this.detectScroll = this.detectScroll.bind(this)
    this.ontouch = this.ontouch.bind(this)
    this.loadTouch = this.loadTouch.bind(this)
    // this.updatePointer = this.updatePointer.bind(this)
  }

  generateAfterChange (direction) {
    let prev = document.getElementById('prev')
    let next = document.getElementById('next')
    let inner = window.innerWidth
    const slideTrackEl = document.querySelector('#loggedin-tab #slick-track')
    const vpWidth = Math.max(document.documentElement.clientWidth, inner || 0)

    let widthTabs = 0
    widthTabs = document.getElementById('slick-track').offsetWidth
    if (direction === 'next') {
      next.className = 'slick-arrow slick-next slick-disabled'
      prev.className = 'slick-arrow slick-prev'
      this.detectScroll()
      const maxTranslateX = -1 * (widthTabs - vpWidth)
      slideTrackEl.style.transform = `translate3d(${maxTranslateX}px, 0px, 0px)`
    } else if (direction === 'prev') {
      next.className = 'slick-arrow slick-next'
      prev.className = 'slick-arrow slick-prev slick-disabled'
      this.detectScroll()
      slideTrackEl.style.transform = `translate3d(0px, 0px, 0px)`
    }
  }

  componentWillReceiveProps () {
    this.detectScroll()
  }

  detectScroll () {
    var header = document.getElementsByTagName('header')[0].className
    console.log(header)
    if (header.indexOf('transform') >= 0) {
      document.getElementById('next').classList.add('mini')
      document.getElementById('prev').classList.add('mini')
    } else {
      document.getElementById('next').classList.remove('mini')
      document.getElementById('prev').classList.remove('mini')
    }
  }

  loadTouch () {
    let axis = 0 // define global for axis touch
    var velo = 0.8, range = 50
    let ele = document.getElementById('slick-track')
    let inner = window.innerWidth
    const vpWidth = Math.max(document.documentElement.clientWidth, inner || 0)
    const widthTabs = document.getElementById('slick-track').offsetWidth
    const maxTranslateX = -1 * (widthTabs - vpWidth)
    const slideTrackEl = document.querySelector('#loggedin-tab #slick-track')
    this.ontouch(ele, function (evt, dir, phase, swipetype, distance) {
      if (axis + (distance * velo) <= (0 + range) &&
      axis + (distance * velo) >= (maxTranslateX - range) && phase === 'move') {
        axis = axis + (distance * velo)
        slideTrackEl.style.transform = `translate3d(${axis}px,
          0px, 0px)`
      }
      if (phase === 'end') {
        let tamp
        let prev = document.getElementById('prev')
        let next = document.getElementById('next')
        if (axis >= 0) {
          tamp = 0
          next.className = 'slick-arrow slick-next'
          prev.className = 'slick-arrow slick-prev slick-disabled'
          slideTrackEl.style.transform = `translate3d(${0}px,
            0px, 0px)`
        } else if (axis <= maxTranslateX) {
          tamp = maxTranslateX
          next.className = 'slick-arrow slick-next slick-disabled'
          prev.className = 'slick-arrow slick-prev'
          slideTrackEl.style.transform = `translate3d(${maxTranslateX}px,
            0px, 0px)`
        }
        slideTrackEl.style.transform = `translate3d(${tamp}px,
          0px, 0px)`
        var header = document.getElementsByTagName('header')[0].className
        if (header.indexOf('transform') >= 0) {
          document.getElementById('next').classList.add('mini')
          document.getElementById('prev').classList.add('mini')
        } else {
          document.getElementById('next').classList.remove('mini')
          document.getElementById('prev').classList.remove('mini')
        }
      }
    })
  }

  ontouch (el, callback) {
  /* eslint one-var:
  ["error", { var: "always", let: "never", const: "never" }] */
    /* eslint-env es6 */
    var touchsurface = el,
      dir,
      swipeType,
      startX,
      startY,
      distX,
      distY,
      threshold = 150,
      restraint = 100,
      allowedTime = 500,
      elapsedTime,
      startTime,
      handletouch = callback ||
    function (evt, dir, phase, swipetype, distance) {}

    touchsurface.addEventListener('touchstart', function (e) {
      var touchobj = e.changedTouches[0]
      dir = 'none'
      swipeType = 'none'
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime()
      handletouch(e, 'none', 'start', swipeType, 0)
      // e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX
      distY = touchobj.pageY - startY
      if (Math.abs(distX) > Math.abs(distY)) {
        dir = (distX < 0) ? 'left' : 'right'
        handletouch(e, dir, 'move', swipeType, distX)
      } else {
        dir = (distY < 0) ? 'up' : 'down'
        handletouch(e, dir, 'move', swipeType, distY)
      }
      // e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
      elapsedTime = new Date().getTime() - startTime
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          swipeType = dir
        } else if (Math.abs(distY) >= threshold &&
          Math.abs(distX) <= restraint) {
          swipeType = dir
        }
      }
      handletouch(e, dir, 'end', swipeType, (dir === 'left' || dir === 'right') ? distX : distY)
      // e.preventDefault()
    }, false)
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.detectScroll)
    window.addEventListener('load', this.loadTouch())
    window.addEventListener('touchmove', this.handleTouchMove)
    this.handleResize()
  }

  componentWillUnmount () {
    if (window.removeEventListener && this.handleResize) {
      window.removeEventListener('resize', this.handleResize)
      clearTimeout(this.resizeTimeout)
    }
  }

  handleHeaderClick (event) {
    const index = parseInt(event.currentTarget.id)
    if (this.props.onChange) {
      this.props.onChange(index)
    }
  }

  handleResize () {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = null
    }
  }

  initNavigationNode (node) {
    this.navigationNode = node
  }

  parseChildren () {
    const headers = []
    const contents = []

    React.Children.forEach(this.props.children, item => {
      if (item.type === Tab) {
        headers.push(item)

        if (item.props.children) {
          contents.push(<TabContent children={item.props.children} />)
        }
      } else if (item.type === TabContent) {
        contents.push(item)
      }
    })

    return { headers, contents }
  }

  renderHeaders (headers) {
    return headers.map((item, index) => {
      return React.cloneElement(item, {
        className: 'tab__link',
        id: index,
        key: `tab-header-${index}`,
        onClick: (event) => {
          this.handleHeaderClick(event)
          item.props.onClick && item.props.onClick(event)
        }
      })
    })
  }

  renderContents (contents) {
    const contentElements = contents.map((item, index) => {
      return React.cloneElement(item, {
        key: `tab-content-${index}`,
        isActive: this.props.index === index,
        hidden: this.props.index !== index,
        tabIndex: index
      })
    })

    return contentElements.filter((item, index) => (this.props.index === index))
  }

  render () {
    const { headers, contents } = this.parseChildren()
    const _className = classnames(this.props.className, {
      'tab__inverted': this.props.inverse
    })

    return (
      <div className={_className} id='loggedin-tab'>
        <button type='button'
          onClick={() => this.generateAfterChange('prev')}
          id='prev'
          className='slick-arrow slick-prev slick-disabled'>
         Previous
        </button>
        <button type='button'
          onClick={() => this.generateAfterChange('next')}
          id='next'
          className='slick-arrow slick-next'>
         Next
        </button>
        <div className='slider'>
          <nav ref={this.initNavigationNode} className='tab'>
            <span id='slick-track'>
              {this.renderHeaders(headers)}
            </span>
          </nav>
        </div>
        {/* <span className='tab__pointer' style={this.state.pointer} /> */}
        {this.renderContents(contents)}
      </div>
    )
  }
}

export default Tabs

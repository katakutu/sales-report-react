import React, { Component } from 'react'
import classnames from 'classnames'
import './Tabs.scss'
import Tab from './Tab.js'
import TabContent from './TabContent'
import OnTouch from './OnTouch'

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
    this.loadTouch = this.loadTouch.bind(this)
    this.activeStateTabArrow = this.activeStateTabArrow.bind(this)
  }

  activeStateTabArrow (next, prev, state) {
    // set active for tab arrow
    if (state === 'activeNext') {
      next.className = 'slick-arrow slick-next'
      prev.className = 'slick-arrow slick-prev slick-disabled'
    } else {
      next.className = 'slick-arrow slick-next slick-disabled'
      prev.className = 'slick-arrow slick-prev'
    }
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
      this.activeStateTabArrow(next, prev, 'activePrev')
      this.detectScroll()
      const maxTranslateX = -1 * (widthTabs - vpWidth)
      slideTrackEl.style.transform = `translate3d(${maxTranslateX}px, 0px, 0px)`
    } else if (direction === 'prev') {
      this.activeStateTabArrow(next, prev, 'activeNext')
      this.detectScroll()
      slideTrackEl.style.transform = `translate3d(0px, 0px, 0px)`
    }
  }

  detectScroll () {
    var header = document.getElementsByTagName('header')[0].className
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
    var velo = 0.8 // define velocity for speed tab
    var range = 50 // define range for bounche
    let ele = document.getElementById('slick-track')
    let inner = window.innerWidth
    const vpWidth = Math.max(document.documentElement.clientWidth, inner || 0)
    const widthTabs = document.getElementById('slick-track').offsetWidth
    const maxTranslateX = -1 * (widthTabs - vpWidth)
    const slideTrackEl = document.querySelector('#loggedin-tab #slick-track')
    let prev = document.getElementById('prev')
    let next = document.getElementById('next')
    const that = this
    OnTouch.load(ele, function (evt, dir, phase, swipetype, distance) {
      // check prediction of distance swipe in available range
      if (axis + (distance * velo) <= (0 + range) &&
      axis + (distance * velo) >= (maxTranslateX - range) && phase === 'move') {
        axis = axis + (distance * velo)
        slideTrackEl.style.transform = `translate3d(${axis}px,
          0px, 0px)`
      }
      if (phase === 'end') {
        // put back on track range for bounching effect
        let tamp
        if (axis >= 0) {
          tamp = 0
          that.activeStateTabArrow(next, prev, 'activeNext')
        } else if (axis <= maxTranslateX) {
          tamp = maxTranslateX
          that.activeStateTabArrow(next, prev, 'activePrev')
        }
        slideTrackEl.style.transform = `translate3d(${tamp}px,
          0px, 0px)`
        that.detectScroll()
      }
    })
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.detectScroll)
    window.addEventListener('load', this.loadTouch())
    this.handleResize()
  }

  componentWillReceiveProps () {
    this.detectScroll()
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
        {this.renderContents(contents)}
      </div>
    )
  }
}

export default Tabs

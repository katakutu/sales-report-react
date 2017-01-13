/* eslint max-len: ["error", { "ignoreStrings": true }] */
import React, { Component } from 'react'
import classnames from 'classnames'
import './Tabs.scss'
import Tab from './Tab.js'
import TabContent from './TabContent'
let xDown = null;                                                        
let yDown = null; 
let location = 0;
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
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
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

  componentWillReceiveProps() {
    this.detectScroll()
  }
                                                      

  handleTouchStart(evt) {                                         
      xDown = evt.touches[0].clientX;                                      
      yDown = evt.touches[0].clientY;                                      
  }                                               

  handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
      console.log(xDiff)
      const slideTrackEl = document.getElementById('slick-track')
      let inner = window.innerWidth
      // const maxTranslateX = (widthTabs - vpWidth)
      // let value = window.getComputedStyle(slideTrackEl).getPropertyValue('transform');
      // const value2 = value.split(', ');
      // console.log(window.getComputedStyle(slideTrackEl).getPropertyValue('transform'));
      // console.log(value2[4]+', '+(xDiff/2)+' = '+maxTranslateX);
      // if(xDiff<0) { xDiff = 0; }
      if(location + (-1 * xDiff) > (inner/5) || location + (-1 * xDiff) < (-1 * (inner/2))){

      }else{
        location += (-1 * xDiff/2)
      }
      

      slideTrackEl.style.transform = `translate3d(${location}px, 0px, 0px)`
      // if(maxTranslateX < 0){
      //   maxTranslateX = 0;
      // }
     
      // console.log(window.getComputedStyle(slideTrackEl,null).getPropertyValue('transform'));
      // if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      //     if ( xDiff > 0 ) {
      //         /* left swipe */ 
      //     } else {
      //         /* right swipe */
      //     }                       
      // } else {
      //     if ( yDiff > 0 ) {
      //         /* up swipe */ 
      //     } else { 
      //         /* down swipe */
      //     }                                                                 
      // }
      // /* reset values */
      // xDown = null;
      // yDown = null;                                             
  }

  detectScroll () {
    var header = document.getElementsByTagName('header')[0].className
    console.log(header);
    if (header.indexOf('transform') >= 0) {
      document.getElementById('next').classList.add('mini')
      document.getElementById('prev').classList.add('mini')
    } else {
      document.getElementById('next').classList.remove('mini')
      document.getElementById('prev').classList.remove('mini')
    }
  }
  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.detectScroll)
    window.addEventListener('touchstart', this.handleTouchStart)
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
        <button type='button' onClick={() => this.generateAfterChange('prev')} id='prev' className='slick-arrow slick-prev slick-disabled'>
         Previous
        </button>
        <button type='button' onClick={() => this.generateAfterChange('next')} id='next' className='slick-arrow slick-next'>
         Next
        </button>
        <div className="slider">
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

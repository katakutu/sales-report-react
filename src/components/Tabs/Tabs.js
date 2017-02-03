import React, { Component } from 'react'
import classnames from 'classnames'
import './Tabs.scss'
import Tab from './Tab.js'
import TabContent from './TabContent'

class Tabs extends Component {
  static propTypes = {
    arrowOff: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    stateTab: React.PropTypes.string,
    id: React.PropTypes.string,
    index: React.PropTypes.number,
    inverse: React.PropTypes.bool,
    userIsLoggedIn: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    headerState: React.PropTypes.string
  }

  static defaultProps = {
    arrowOff: false,
    index: 0,
    inverse: false
  }

  static DIRECTION_LEFT = 'Left'
  static DIRECTION_RIGHT = 'Right'
  static DIRECTION_NEUTRAL = 'L'

  static INITIAL_TOUCH_STATE = {
    pageX: 0,
    direction: Tabs.DIRECTION_NEUTRAL
  }

  state = {
    arrow: {},
    translateXPos: 0,
    touch: {
      direction: Tabs.DIRECTION_NEUTRAL,
      length: 0,
      pageX: 0
    }
  }

  constructor (props) {
    super(props)

    this._getTouchXDirection = this._getTouchXDirection.bind(this)
    this._getTouchXLength = this._getTouchXLength.bind(this)

    this.handleNavTouch = this.handleNavTouch.bind(this)
    this.handleNavTouchEnd = this.handleNavTouchEnd.bind(this)
    this.handleNavTouchStart = this.handleNavTouchStart.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.handleHeaderClick = this.handleHeaderClick.bind(this)

    this.initNavigationNode = this.initNavigationNode.bind(this)

    this.parseChildren = this.parseChildren.bind(this)
    this.renderContents = this.renderContents.bind(this)
    this.renderHeaders = this.renderHeaders.bind(this)
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollNavigation = this.scrollNavigation.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
    this.updateArrows = this.updateArrows.bind(this)

    this.navigationNode = null
    this.resizeTimeout = null
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount () {
    if (window.removeEventListener && this.handleResize) {
      window.removeEventListener('resize', this.handleResize)
      clearTimeout(this.resizeTimeout)
    }
  }

  _getTouchXLength (touch) {
    return Math.abs(touch.pageX - this.state.touch.pageX)
  }

  _getTouchXDirection (touch) {
    return touch.pageX < this.state.touch.pageX ? Tabs.DIRECTION_LEFT : Tabs.DIRECTION_RIGHT
  }

  handleNavTouchStart (event) {
    if (event.touches.length !== 1) {
      return
    }

    this.setState({
      touch: {
        direction: this.state.touch.direction,
        length: this.state.touch.length,
        pageX: event.touches[0].pageX
      }
    })
  }

  handleNavTouch (event) {
    if (event.touches.length !== 1 || !this.state.touch.direction) {
      return
    }

    const touch = event.touches[0]
    const dir = this._getTouchXDirection(touch)
    const length = this._getTouchXLength(touch)

    const maxLeftMove = -1 * (this.navigationNode.clientWidth - window.innerWidth)
    const dirLength = dir === Tabs.DIRECTION_LEFT ? length * -1 : length

    let finalLength = dirLength > 0 ? 0 : dirLength
    if (dir === Tabs.DIRECTION_LEFT && dirLength < maxLeftMove) {
      finalLength = maxLeftMove
    }

    // direction changed
    if (this.state.touch.direction !== dir) {
      this.setState({
        touch: {
          direction: dir,
          length: finalLength,
          pageX: touch.pageX
        }
      })

      event.preventDefault()
      return 
    }

    this.setState({
      touch: {
        direction: this.state.touch.direction,
        length: finalLength,
        pageX: this.state.touch.pageX
      }
    })
  }

  handleNavTouchEnd () {
    this.updateArrows()
  }

  handleResize () {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = null
    }

    this.resizeTimeout = setTimeout(() => {
      this.updateArrows()
    }, 100)
  }

  handleHeaderClick(event) {
    const index = parseInt(event.currentTarget.id)
    if (this.props.onChange) {
      this.props.onChange(index)
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

  scrollLeft () { this.scrollNavigation(1) }

  scrollNavigation (factor) {
    const oldScrollLeft = this.state.touch.length
    const newScrollLeft = factor * (this.navigationNode.clientWidth - window.innerWidth)
    this.setState({
      touch: {
        direction: this.state.touch.direction,
        length: newScrollLeft > 0 ? 0 : newScrollLeft,
        pageX: this.state.touch.pageX
      }
    }, () => {
      if (newScrollLeft !== oldScrollLeft) {
        this.updateArrows();
      }
    })
  }

  scrollRight () { this.scrollNavigation(-1) }

  updateArrows () {
    const index = this.navigationNode.children.length - 1

    if (index >= 0 && this.navigationNode.children.length > 2) {
      const nav = this.navigationNode.getBoundingClientRect()
      const last = this.navigationNode.children[index].getBoundingClientRect()

      this.setState({
        arrow: {
          left: this.state.touch.length < 0,
          right: this.state.touch.length === 0 && (nav.right - 5) < last.right
        }
      })
    }
  }

  render () {
    const { headers, contents } = this.parseChildren()
    const _className = classnames(this.props.className, {
      'tab__inverted': this.props.inverse,
      'tabs': true
    })
    const _classTab = this.props.userIsLoggedIn ? 'tab' : 'tab logged-out'
    const id = this.props.id || 'loggedin-tab'

    const hasRightArrow = this.state.arrow.right
    const hasLeftArrow = this.state.arrow.left

    const translateX = this.state.touch.length
    const finalTransform = translateX > 0 ? 0 : translateX
    const scrollStyle = {
      'transform': `translateX(${finalTransform}px)`
    }

    return (
      <div className={_className} id={id}>
        { !this.props.arrowOff && hasLeftArrow &&
          <button
            type='button'
            id='prev'
            className='slick-arrow slick-prev'
            onClick={this.scrollLeft}>
            Previous
          </button>
        }

        <div className='slider'>
          <nav
            className={_classTab}
            onTouchStart={this.handleNavTouchStart}
            onTouchMove={this.handleNavTouch}
            onTouchEnd={this.handleNavTouchEnd}>
            <span
              className='slick-track'
              style={scrollStyle}
              ref={this.initNavigationNode}
              onTouchStart={this.handleNavTouchStart}
              onTouchMove={this.handleNavTouch}
              onTouchEnd={this.handleNavTouchEnd}>
              {this.renderHeaders(headers)}
            </span>
          </nav>
        </div>

        { !this.props.arrowOff && hasRightArrow &&
          <button
            type='button'
            id='next'
            className='slick-arrow slick-next'
            onClick={this.scrollRight}>
            Next
          </button>
        }

        {this.renderContents(contents)}
      </div>
    )
  }
}

export default Tabs

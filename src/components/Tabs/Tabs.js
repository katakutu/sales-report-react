import React, { Component } from 'react'
import classnames from 'classnames'
import './Tabs.scss'
import Tab from './Tab.js'
import TabContent from './TabContent'

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
    this.updatePointer = this.updatePointer.bind(this)
  }

  generateAfterChange (direction) {
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');
    console.log(direction);
    if(direction=='next'){
      next.className="slick-arrow slick-next slick-disabled";
      prev.className="slick-arrow slick-prev";
    }else if(direction=='prev'){
      next.className="slick-arrow slick-next";
      prev.className="slick-arrow slick-prev slick-disabled";
    }
    const slideTrackEl = document.querySelector('#loggedin-tab .tab')
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const tabWidths = Array.prototype.slice.call(
      document.querySelectorAll('#loggedin-tab .tab__link'),
      0
    ).map(s => s.offsetWidth)
    let widthTabs = 0
    console.log(tabWidths.length);
    for (let i = tabWidths.length; i > 0; i--) {
      widthTabs += tabWidths[i]
      
    }
    console.log(widthTabs);
    const maxTranslateX = -1 * (widthTabs - viewportWidth)
    slideTrackEl.style.transform = `translate3d(${maxTranslateX}px, 0px, 0px)`
    // return (currentSlide) => {
    //   if (currentSlide >= 2) {
    //     const slideTrackEl = document.querySelector('#loggedin-tab .slick-track')
    //     const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    //     const tabWidths = Array.prototype.slice.call(
    //       document.querySelectorAll('#loggedin-tab .slick-slide'),
    //       0
    //     ).map(s => s.offsetWidth)

    //     // Move menu to the right (in variable offset)
    //     // based on how many menus fit on one screen.
    //     // Menus are moved to the right one by one based
    //     // on each tab's width until we reach the max point
    //     // we want (paddingRight)
    //     let widthTabs = 0
    //     for (let i = tabWidths.length; i > 0; i--) {
    //       widthTabs += tabWidths[i]
    //     }

    //     // calculate the actual translation needed
    //     const maxTranslateX = -1 * (widthTabs - viewportWidth)
    //     slideTrackEl.style.transform = `translate3d(${maxTranslateX}px, 0px, 0px)`

    //     el.slickGoTo(2)
    //   }
    // }
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

  componentWillReceiveProps (nextProps) {
    this.updatePointer(nextProps.index)
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

    this.resizeTimeout = setTimeout(() => {
      this.updatePointer(this.props.index)
    }, 100)
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
        isActive: this.props.index === index,
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

  updatePointer (index) {
    if (this.navigationNode && this.navigationNode.children[index]) {
      const nav = this.navigationNode.getBoundingClientRect()
      const label = this.navigationNode.children[index].getBoundingClientRect()
      const scrollLeft = this.navigationNode.scrollLeft

      this.setState({
        pointer: {
          left: `${label.left - nav.left + scrollLeft}px`,
          width: `${label.width}px`
        }
      })
    }
  }

  render () {
    const { headers, contents } = this.parseChildren()
    const _className = classnames(this.props.className, {
      'tab__inverted': this.props.inverse
    })

    return (
      <div className={_className} id="loggedin-tab">
        <nav ref={this.initNavigationNode} className='tab'>
          <button type="button" onClick={() => this.generateAfterChange("prev")} id="prev" className="slick-arrow slick-prev slick-disabled"> Previous</button>
            {this.renderHeaders(headers)}
          <button type="button" onClick={() => this.generateAfterChange("next")} id="next" className="slick-arrow slick-next"> Next</button>
        </nav>
        
        {this.renderContents(contents)}
      </div>
    )
  }
}

export default Tabs

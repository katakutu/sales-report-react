import React, { Component } from 'react'
import Cookies from '../../lib/utils/Cookies'
import './Ticker.scss'

class Ticker extends Component {
  static propTypes = {
    perTickDuration: React.PropTypes.number,
    tickers: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  state = {
    nextContentIndex: 0,
    content: '',
    color: '',
    // initial value that will get refreshed right away
    refreshInterval: this.props.perTickDuration * 1000
  }

  constructor (props) {
    super(props)

    this.refreshTickers = this.refreshTickers.bind(this)
    this.poolTickerRefresh = this.poolTickerRefresh.bind(this)
    this.loadTicker = this.loadTicker.bind(this)
    this.closeTicker = this.closeTicker.bind(this)

    this._intervalID = null
  }

  componentDidMount () {
    const cookies = Cookies.hasItem('ticker')
    if (!cookies) {
      this.loadTicker()
    } else {
      const now = new Date()
      let date = new Date(Cookies.getItem('ticker'))
      let result = (date.getTime() - now.getTime())
      let that = this
      setTimeout(function () {
        that.loadTicker()
      }, result)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.tickers.length > 0) {
      const nextRefresh = this.props.perTickDuration * nextProps.tickers.length * 1000
      this.setState({
        nextContentIndex: 1,
        content: nextProps.tickers[0]['message'],
        color: nextProps.tickers[0]['color'],
        refreshInterval: nextRefresh
      })
    }
  }

  componentWillUnmount () {
    if (this._intervalID) {
      clearInterval(this._intervalID)
      this._intervalID = null
    }
  }

  loadTicker () {
    this.poolTickerRefresh()

    if (this.props.tickers.length > 0) {
      this.setState({
        nextContentIndex: 1,
        content: this.props.tickers[0]['message'],
        color: this.props.tickers[0]['color']
      })
    }
  }

  closeTicker () {
    // 5 minute
    const rangeTime = (5 * 60 * 1000)
    let domain = location.hostname
    if (window.location.href.indexOf('ndvl') > -1) {
      domain = /(\..*\.ndvl)/.exec(location.hostname)[1]
    } else if (window.location.href.indexOf('localhost') > -1) {
      domain = /(localhost)/.exec(location.hostname)[1]
    } else if (window.location.href.indexOf('ndvl') < 0) {
      domain = /(\..*\.com)/.exec(location.hostname) &&
        /(\..*\.com)/.exec(location.hostname)[1] ||
        location.hostname
    }

    const date = new Date()
    date.setTime(date.getTime() + rangeTime)

    Cookies.setItem('ticker', date, date, '/', domain, false)
    clearInterval(this._intervalID)
    this.setState({
      nextContentIndex: 0,
      content: '',
      color: '',
      refreshInterval: ''
    })

    let that = this
    setTimeout(function () {
      that.loadTicker()
    }, rangeTime)
  }

  poolTickerRefresh () {
    this._intervalID = setInterval(this.refreshTickers, this.state.refreshInterval)
  }

  refreshTickers () {
    if (this.props.tickers.length > 0) {
      let dataCount = this.props.tickers.length
      let nextRefresh = this.props.perTickDuration * dataCount * 1000
      let contentIndex = (this.state.nextContentIndex > (dataCount - 1)) ? 0
        : this.state.nextContentIndex

      this.setState({
        nextContentIndex: contentIndex + 1,
        content: this.props.tickers[contentIndex]['message'],
        color: this.props.tickers[contentIndex]['color'],
        refreshInterval: nextRefresh
      })
    }
  }

  render () {
    const ts = this.state.content !== '' ? {} : { display: 'none' }
    const cl = this.state.color === '' ? {} : { borderColor: this.state.color }

    return (
      <div className='ticker' style={ts}>
        <div style={cl} className={'ticker__container ticker--general'}>
          <span dangerouslySetInnerHTML={{ __html: this.state.content }} />
          <a className='ticker__close' onClick={this.closeTicker} />
        </div>
      </div>
    )
  }
}

export default Ticker

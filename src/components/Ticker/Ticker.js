import React, { Component } from 'react'
import './Ticker.scss'

class Ticker extends Component {
  static propTypes = {
    perTickDuration: React.PropTypes.number,
    tickers: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  state = {
    nextContentIndex: 0,
    content: '',
    // initial value that will get refreshed right away
    refreshInterval: this.props.perTickDuration * 1000
  }

  constructor (props) {
    super(props)

    this.refreshTickers = this.refreshTickers.bind(this)
    this.poolTickerRefresh = this.poolTickerRefresh.bind(this)

    this._intervalID = null
  }

  componentDidMount () {
    this.poolTickerRefresh()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.tickers.length > 0) {
      const nextRefresh = this.props.perTickDuration * nextProps.tickers.length * 1000
      this.setState({
        nextContentIndex: 1,
        content: nextProps.tickers[0]['message'],
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
        refreshInterval: nextRefresh
      })
    }
  }

  render () {
    const ts = this.state.content !== '' ? {} : { height: '0' }

    return (
      <div className='ticker' style={ts}>
        <div className='ticker__container' dangerouslySetInnerHTML={{ __html: this.state.content }} />
      </div>
    )
  }
}

export default Ticker

import React, { Component } from 'react'
import TopedTickersAPI from '../../lib/api/Search/TopedTickersAPI'
import './Ticker.scss'

const api = new TopedTickersAPI()

class Ticker extends Component {
  static propTypes = {
    perTickDuration: React.PropTypes.number
  }

  constructor (props) {
    super(props)

    this.refreshTickers = this.refreshTickers.bind(this)
    this.poolTickerRefresh = this.poolTickerRefresh.bind(this)

    this.state = {
      nextContentIndex: 0,
      content: '',
      // initial value that will get refreshed right away
      refreshInterval: this.props.perTickDuration * 1000
    }

    this._intervalID = null
  }

  componentDidMount () {
    this.poolTickerRefresh()
  }

  componentWillUnmount () {
    if (this._intervalID) {
      clearInterval(this._intervalID)
      this._intervalID = null
    }
  }

  poolTickerRefresh () {
    this.refreshTickers() // initial startup
    this._intervalID = setInterval(this.refreshTrackers, this.state.refreshInterval)
  }

  refreshTickers () {
    api.getTickers(0, 50, 'desktop', 'data_source_ticker').then(response => {
      if (response['data']['tickers'].length > 0) {
        let dataCount = response['meta']['total_data']
        let nextRefresh = this.props.perTickDuration * dataCount * 1000
        let contentIndex = (this.state.nextContentIndex >= (dataCount - 1)) ? 0
                : this.state.nextContentIndex

        this.setState({
          nextContentIndex: contentIndex + 1,
          content: response['data']['tickers'][contentIndex]['message'],
          refreshInterval: nextRefresh
        })
      }
    })
  }

  render () {
    let result = <div />
    if (this.state.content !== '') {
      result = (
        <div className='ticker' dangerouslySetInnerHTML={{ __html: this.state.content }} />
            )
    }

    return result
  }
}

export default Ticker

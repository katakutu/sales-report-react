import React, { Component } from 'react'
import TopHotListAPI from '../../lib/api/Search/TopedHotListAPI'
import './Ticker.scss'

const api = new TopHotListAPI()

class Promo extends Component {
//   static propTypes = {
//     perTickDuration: React.PropTypes.number
//   }

  constructor (props) {
    super(props)

//     this.refreshTickers = this.refreshTickers.bind(this)
//     this.poolTickerRefresh = this.poolTickerRefresh.bind(this)

    this.state = {
      nextContentIndex: 0,
      content: ''
      // initial value that will get refreshed right away
    //   refreshInterval: this.props.perTickDuration * 1000
    }

//     this._intervalID = null
//   }

  componentDidMount () {
    this.intialHotList()
  }

//   componentWillUnmount () {
//     if (this._intervalID) {
//       clearInterval(this._intervalID)
//       this._intervalID = null
//     }
//   }

  // poolTickerRefresh () {
  //   this.refreshHotList() // initial startup
  //   this._intervalID = setInterval(this.refreshHotList, this.state.refreshInterval)
  // }

  intialHotList () {
    api.getHotList('').then(response => {
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
        <div className='Test' dangerouslySetInnerHTML={{ __html: this.state.content }} />
            )
    }

    return result
  }
}

export default Promo

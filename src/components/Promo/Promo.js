import React, { Component } from 'react'
import TopHotListAPI from '../../lib/api/Search/TopedHotListAPI'

const api = new TopHotListAPI()

class Promo extends Component {
  static propTypes = {
    perTickDuration: React.PropTypes.number
  }

  constructor (props) {
    super(props)

    this.state = {
      nextContentIndex: 0,
      content: ''
    }
  }

  componentDidMount () {
    this.intialHotList()
  }

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

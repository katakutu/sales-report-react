import React, { Component, PropTypes } from 'react'
import TextHeader from '../../../components/TextHeader'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import queries from './../../../queries'
import FeedCarousel from './FeedCarousel'
import lang from '../../../lib/utils/Lang'

class RecentView extends Component {

  static propTypes = {
    data: PropTypes.object,
    lang: PropTypes.string,
    userID: PropTypes.number
		// recentviews: PropTypes.arrayOf(PropTypes.object)
  }

  constructor (props) {
    	super(props)
  }

  state = {
    recentviews: []
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps['data'] && !nextProps.data.loading) {
      const data = nextProps['data']['get_recent_view'] && nextProps['data']['get_recent_view']['items']
      const gqlData = data || []
      const newData = gqlData.filter(data => {
        return true
      })
      this.setState({
        recentviews: this.state.recentviews.concat(newData)
      })
    }
  }

  render () {
    if (this.props.data.loading) {
      return (
        <div />
      )
    }

    return (
      <div className=''>
        <TextHeader textType={1} injectClassName='recent-view__title'>
          { lang[this.props.lang]['TERAKHIR DILIHAT'] }
        </TextHeader>
        <div className='mt-20 mb-20'>
          <FeedCarousel images={this.state.recentviews} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}

export default graphql(queries.RecentViewQuery, {
  options: ({ userID }) => ({
	  variable: { userID },
	  foreachfetch: true,
	  returnPartialData: true })
})(connect(mapStateToProps, undefined)(RecentView))

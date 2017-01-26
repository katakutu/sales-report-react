import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import queries from './../../../queries'
import TextHeader from '../../../components/TextHeader'
import FeedCarousel from './FeedCarousel'

class Inspiration extends Component {

  static propTypes = {
    data: PropTypes.object,
    lang: PropTypes.string,
    userID: PropTypes.number,
    title: PropTypes.string,
    recommendationSource: PropTypes.string,
    recommendationSize: PropTypes.number
  }

  state = {
    inspirations: []
  }

  componentWillReceiveProps (nextProps) {
    // console.log('NEXTPROPs' + nextProps['data'])
    if (nextProps['data'] && !nextProps.data.loading) {
      const data = nextProps['data']['get_recommendation'] && nextProps['data']['get_recommendation']['items']
      // console.log(data)
      const gqlData = data || []
      const newData = gqlData.filter(data => {
        return true
      })
      this.setState({
        inspirations: this.state.inspirations.concat(newData)
      })
    }
  }

  render () {
    if (this.props.data.loading) {
      return (
        <div />
      )
    }
    const isTitle = this.state.inspirations !== [] && this.state.inspirations.length > 0
    return (
      <div className='u-clearfix'>
        { isTitle &&
          <TextHeader textType={1} injectClassName='{ this.props.title }__title'>
            { this.props.title }
          </TextHeader>
        }
        <div className='mt-20 pb-20'>
          <FeedCarousel images={this.state.inspirations} />
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

export default graphql(queries.RecommedationQuery, {
  options: ({ userID, recommendationSource, recommendationSize }) => ({
    variable: { userID, recommendationSource, recommendationSize },
    foreachfetch: true,
    returnPartialData: true })
})(connect(mapStateToProps, undefined)(Inspiration))

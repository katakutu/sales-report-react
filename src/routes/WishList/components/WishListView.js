import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import WishList from './WishList'

import SplashScreen from '../../../components/Loading/SplashScreen'
import LoadMore from '../../../components/LoadMore'
import queries from '../../../queries'
import lang from '../../../lib/utils/Lang'
import { updateQuery } from '../module'

import { graphql } from 'react-apollo'

class WishlistView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    hasNextPage: React.PropTypes.bool,
    lang: React.PropTypes.string,
    query: React.PropTypes.string,
    totalWishlist: React.PropTypes.number,
    updateQuery: React.PropTypes.func,
    wishlists: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  static WISHLIST_PER_PAGE = 20

  state = {
    page: 1,
    query: '',
    refetch: false
  }

  constructor (props) {
    super(props)

    this.resetSearch = this.resetSearch.bind(this)
    this.searchWishlist = this.searchWishlist.bind(this)
    this.updateFinalQuery = this.updateFinalQuery.bind(this)
    this.viewMore = this.viewMore.bind(this)
  }

  resetSearch () {
    this.setState({ query: '' })
    this.props.updateQuery('')
    browserHistory.push({
      pathname: '/wishlist'
    })
  }

  searchWishlist (event) {
    this.setState({ query: event.target.value })
  }

  updateFinalQuery (event) {
    if (event.key === 'Enter') {
      const fq = event.target.value

      this.props.updateQuery(fq)
      this.setState({
        refetch: true,
        page: 1
      })

      browserHistory.push({
        pathname: '/wishlist'
      })
    }
  }

  viewMore (event) {
    event.preventDefault()

    this.setState({ page: this.state.page + 1 }, () => {
      browserHistory.push({
        pathname: '/wishlist',
        query: { page: this.state.page }
      })
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.query === '') {
      this.setState({ query: '' })
    }
  }

  render () {
    if (this.props.data.loading) {
      return (
        <SplashScreen />
      )
    }

    const user = this.props.data.user || {}
    const userInfo = Object.assign(user, {
      'deposit': this.props.data.saldo,
      'points': this.props.data.points,
      'notifications': this.props.data.notifications.data,
      'shop': this.props.data.shop,
      'wallet': this.props.data.wallet
    })

    const wlCount = this.props.wishlists.length

    const searchTransitionOptions = {
      transitionName: 'searchTransition',
      transitionAppear: true,
      transitionAppearTimeout: 500,
      transitionEnter: true,
      transitionEnterTimeout: 500,
      transitionLeave: true,
      transitionLeaveTimeout: 500
    }

    return (
      <div id='wishlist-view-container'>
        <HeaderHomeOld userInfo={userInfo} tabIsAvailable activeTab='wishlist' />
        <div className='u-clearfix'>
          <div className='wishlist__searchbar-holder'>
            <i className='wishlist__icon wishlist__love-grey wishlist__set-love-grey' />
            <input
              type='text'
              name='searchwishlist'
              className='wishlist__searchbar'
              placeholder={lang[this.props.lang]['Search in Wishlist']}
              onChange={this.searchWishlist}
              onKeyPress={this.updateFinalQuery}
              value={this.state.query} />
          </div>

          <ReactCSSTransitionGroup {...searchTransitionOptions}>
            {
              this.props.query !== '' &&
              <div id='search-stats'>
                <div className='u-col u-col-6 search-stats-detail'>
                  <p className='wishlist__search-result'>{wlCount} {lang[this.props.lang]['Hasil']}</p>
                </div>
                <div className='u-col u-col-6 search-stats-detail'>
                  <span className='wishlist__reset-search' onClick={this.resetSearch}>
                    { lang[this.props.lang]['Clear'] }
                  </span>
                </div>
                <div className='u-clearfix' />
              </div>
            }
          </ReactCSSTransitionGroup>

          <WishList
            userID={parseInt(userInfo['id'])}
            page={this.state.page}
            count={WishlistView.WISHLIST_PER_PAGE}
            shouldRefetch={this.state.refetch} />
        </div>

        {
          this.props.hasNextPage &&
          <LoadMore onClick={this.viewMore}>
            {lang[this.props.lang]['View More']}
          </LoadMore>
        }
      </div>
    )
  }
}

const mapDispatchToProps = { updateQuery }
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    hasNextPage: state['wishlist'] ? state['wishlist'].hasNextPage : state.hasNextPage,
    totalWishlist: state['wishlist'] ? state['wishlist'].totalWishlist : state.totalWishlist,
    wishlists: state['wishlist'] ? state['wishlist'].wishlists : state.wishlists,
    query: state['wishlist'] ? state['wishlist'].query : state.query
  }
}

export default graphql(queries.UserDataQuery, {
  options: { returnPartialData: true }
})(connect(mapStateToProps, mapDispatchToProps)(WishlistView))

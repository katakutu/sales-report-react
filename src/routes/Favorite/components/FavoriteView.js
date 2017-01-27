import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { graphql } from 'react-apollo'
import queries from '../../../queries'

// import Favorite from './Favorite'
import FavoriteNew from './FavoriteNew'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import SplashScreen from '../../../components/Loading/SplashScreen'
import LoadMore from '../../../components/LoadMore'
import lang from '../../../lib/utils/Lang'
import './FavoriteView.scss'

class FavoriteView extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    hasNextPage: React.PropTypes.bool,
    lang: React.PropTypes.string,
    totalFavorite: React.PropTypes.number,
    favorites: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  static FAVORITE_PER_PAGE = 10

  state = {
    finalQuery: '',
    page: 1,
    query: '',
    refetch: false
  }

  constructor (props) {
    super(props)

    this.viewMore = this.viewMore.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.searchFavorite = this.searchFavorite.bind(this)
    this.updateFinalQuery = this.updateFinalQuery.bind(this)
  }

  resetSearch () {
    this.setState({ finalQuery: '', query: '' })
    browserHistory.push({
      pathname: '/fave'
    })
  }

  searchFavorite (event) {
    this.setState({ query: event.target.value })
  }

  updateFinalQuery (event) {
    if (event.key === 'Enter') {
      const fq = event.target.value

      this.setState({
        finalQuery: fq,
        refetch: true,
        page: 1
      })

      browserHistory.push({
        pathname: '/fave'
      })
    }
  }

  viewMore (event) {
    event.preventDefault()

    this.setState({ page: this.state.page + 1 }, () => {
      browserHistory.push({
        pathname: '/fave',
        query: { page: this.state.page }
      })
    })
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
    console.log('12---------------------------------------------------------')
    console.log(this.props.favorites)
    console.log('12---------------------------------------------------------')
    const flCount = this.props.favorites.length

    return (
      <div>
        <HeaderHomeOld userInfo={userInfo} tabIsAvailable activeTab='favorite' />
        <div className='u-clearfix favorite favorite--single-page u-mt2'>
          <div className='favorite__searchbar-holder'>
            <i className='favorite__icon favorite__love-grey favorite__set-love-grey' />
            <input
              type='text'
              name='searchwishlist'
              className='favorite__searchbar'
              placeholder={lang[this.props.lang]['Search Shop in Favorite']}
              onChange={this.searchFavorite}
              onKeyPress={this.updateFinalQuery}
              value={this.state.query} />
          </div>

          <div className='favorite__searchbar-holder'>
            <i className='favorite__icon favorite__location-grey favorite__set-love-grey' />
            <input
              type='text'
              name='searchwishlist'
              className='favorite__searchbar'
              placeholder={lang[this.props.lang]['Cari lokasi']} />
          </div>
          {
            this.state.finalQuery !== '' &&
              [
              (
                <div className='u-col u-col-6'>
                  <p className='favorite__search-result'>{flCount} {lang[this.props.lang]['Hasil']}</p>
                </div>
              ),
              (
                <div className='u-col u-col-6' onClick={this.resetSearch}>
                  <span className='favorite__reset-search'>Reset</span>
                </div>
              ),
              (<div className='u-clearfix' />)
              ]
          }

          <div className='u-clearfix' />
          <FavoriteNew
            userID={parseInt(userInfo['id'])}
            query={this.state.finalQuery}
            page={this.state.page}
            count={FavoriteView.FAVORITE_PER_PAGE}
            shouldRefetch={this.state.refetch} />
          {
            this.props.hasNextPage &&
            <LoadMore onClick={this.viewMore}>
              {lang[this.props.lang]['View More']}
            </LoadMore>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    hasNextPage: state['favorite'] ? state['favorite'].hasNextPage : state.hasNextPage,
    totalWishlist: state['favorite'] ? state['favorite'].totalWishlist : state.totalFavorite,
    favorites: state['favorite'] ? state['favorite'].favorites : state.favorites
  }
}

export default graphql(queries.UserDataQuery, {
  options: { returnPartialData: true }
})(connect(mapStateToProps, undefined)(FavoriteView))

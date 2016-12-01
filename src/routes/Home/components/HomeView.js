import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'
import CategoryList from '../../../components/CategoryList'
import OfficialStoreSection from '../../../components/OfficialStoreSection'
import PromoSpacer from '../../../components/PromoSpacer'
import Ticker from '../../../components/Ticker'
import { updateUserLoginStatus } from '../../../store/app'
import TopedLiteAuthAPI from '../../../lib/api/Auth/TopedLiteAuthAPI'
import PulsaWidget from '../../../components/PulsaWidget'

class HomeView extends Component {
  static propTypes = {
    updateUserLoginStatus: React.PropTypes.func,
    userIsLoggedIn: React.PropTypes.bool
  }

  state = {
    activeTabIndex: 0
  }

  constructor (props) {
    super(props)

    this.authAPI = new TopedLiteAuthAPI()

    this.handleTabChange = this.handleTabChange.bind(this)
  }

  componentDidMount () {
    this.authAPI.getUserInfo().then(userinfo => {
      if (userinfo && userinfo['name'] && userinfo['id']) {
        this.props.updateUserLoginStatus(true)
      } else {
        this.props.updateUserLoginStatus(false)
      }
    })
  }

  handleTabChange (index) {
    this.setState({ activeTabIndex: index })
  }

  render () {
    // let loggedInTabs = this.props.userIsLoggedIn ? [
    //   (<Tab label='Feed'><h1>Feed</h1></Tab>),
    //   (<Tab label='Favorite'><h1>Favorite</h1></Tab>),
    //   (<Tab label='Wishlist'><h1>Wishlist</h1></Tab>)
    // ] : []

    return (
      <div>
        <Ticker />
        <Carousel />
        <PromoSpacer />
        <PulsaWidget gtmId='GTM-WD6SLP' />
        <CategoryList />
        <OfficialStoreSection />
      </div>
    )
  }
}

const mapDispatchToProps = { updateUserLoginStatus }
const mapStateToProps = (state) => {
  return {
    userIsLoggedIn: state['app'] ? state['app'].user.loggedIn : state.user.loggedIn
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)

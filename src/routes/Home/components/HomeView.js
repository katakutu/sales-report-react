import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeView.scss'
import HeaderHome from '../../../components/HeaderHome'
import Carousel from '../../../components/Carousel'
import SectionSpacer from '../../../components/SectionSpacer'
import CategoryList from '../../../components/CategoryList'
import Ticker from '../../../components/Ticker'
import Tabs from '../../../components/Tabs/Tabs'
import Tab from '../../../components/Tabs/Tab'
import { updateUserLoginStatus } from '../../../store/app'
import TopedLiteAuthAPI from '../../../lib/api/Auth/TopedLiteAuthAPI'

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
    let loggedInTabs = this.props.userIsLoggedIn ? [
      (<Tab label='Feed'><h1>Feed</h1></Tab>),
      (<Tab label='Favorite'><h1>Favorite</h1></Tab>),
      (<Tab label='Wishlist'><h1>Wishlist</h1></Tab>)
    ] : []

    return (
      <div>
        <HeaderHome />

        <Tabs index={this.state.activeTabIndex} onChange={this.handleTabChange}>
          <Tab label='Home'>
            <Ticker perTickDuration={2} />

            <Carousel />

            <SectionSpacer>
              <i className='section-spacer__icon section-spacer__icon--percent' />
              Lihat Semua Promo
              <i className='section-spacer__icon section-spacer__icon--chevron' />
            </SectionSpacer>

            <CategoryList />
          </Tab>

          <Tab label='Hot List'>
            <h2 style={{ textAlign: 'center' }}>Hot List!</h2>
          </Tab>

          { loggedInTabs.map(t => t) }
        </Tabs>
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

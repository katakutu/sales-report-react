import React, { Component } from 'react'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'
import CategoryList from '../../../components/CategoryList'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import OfficialStoreSection from '../../../components/OfficialStoreSection'
import PromoSpacer from '../../../components/PromoSpacer'
import PromoBanner from '../../../components/PromoBanner'
import Ticker from '../../../components/Ticker'
import HotList from '../../../components/HotList'
import MoreInfo from '../../../components/MoreInfo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class HomeView extends Component {
  static propTypes = {
    data: React.PropTypes.object
  }

  state = {
    activeTabIndex: 0
  }

  constructor (props) {
    super(props)

    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange (index) {
    this.setState({ activeTabIndex: index })
  }

  render () {
    const slides = this.props.data.slides ? this.props.data.slides.slides : []
    const tickers = this.props.data.ticker ? this.props.data.ticker.tickers : []

    const defaultHotlist = { success: 0, message_status: 1, data: [] }
    const hotlists = this.props.data.hotlists ? this.props.data.hotlists : defaultHotlist

    const categories = this.props.data.category ? this.props.data.category : []

    return (
      <div>
        <HeaderHomeOld userInfo={this.props.data.user} />

        <Ticker tickers={tickers} perTickDuration={2} />
        <Carousel images={slides} />
        <PromoSpacer />
        <div id='widget-dmw' className='u-clearfix u-my2' /> { /* Pulsa widget container */ }
        <PromoBanner
          imageUrl='https://ecs7.tokopedia.net/assets-tokopedia-lite/prod/media/images/top-picks-natal.png'
          targetUrl='https://tokopedia.com'
          imageAlt='414 x 90' />
        <HotList data={hotlists} />
        <CategoryList categories={categories} />
        <OfficialStoreSection />
        <MoreInfo />
      </div>
    )
  }
}

const HomeQuery = gql`
query Query {
  user{
    id
    isLoggedIn
    shouldRedirect
    profilePicture
    name
    shop{
      domain
      gold_shop
      id
      is_owner
      location
      lucky_shop
      nameowner_id
      uri
    }
    points{
      data{
        attributes{
          amount_formatted
        }
      }
    }
    deposit{
      deposit_fmt
    }
    notifications{
      status
      data{
        total_notif
        total_cart
        incr_notif
        resolution
        sales{
          sales_new_order
          sales_shipping_status
          sales_shipping_confirm
        }
        inbox{
          inbox_talk
          inbox_ticket
          inbox_review
          inbox_friend
          inbox_message
          inbox_wishlist
          inbox_reputation
        }
        purchase{
          purchase_reorder
          purchase_payment_conf
          purchase_order_status
          purchase_payment_confirm
          purchase_delivery_confirm
        }
      }
    }
  }
  category{
    name
    items{
      identifier
      name
    }
  }
  ticker{
    meta {
      total_data
    }
    tickers{
      id
      title
      message
    }
  }
  slides{
    meta {
      total_data
    }
    slides{
      id
      title
      image_url
      redirect_url
    }
  }
  hotlists{
    message_status
    success
    data{
      title_enc
      image_url
      price_start_from
    }
  }
}
`

export default graphql(HomeQuery)(HomeView)

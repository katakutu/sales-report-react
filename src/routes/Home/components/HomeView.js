import React, { Component } from 'react'
import './HomeView.scss'
import Carousel from '../../../components/Carousel'
import CategoryList from '../../../components/CategoryList'
import HeaderHomeOld from '../../../components/HeaderHomeOld'
import OfficialStoreSection from '../../../components/OfficialStoreSection'
import PromoSpacer from '../../../components/PromoSpacer'
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
    const hotlists = this.props.data['hot_product_home'] ? this.props.data['hot_product_home'] : defaultHotlist

    const categories = this.props.data.category ? this.props.data.category : []

    return (
      <div>
        <HeaderHomeOld userInfo={this.props.data.user} tabIsAvailable activeTab='home' />

        <Ticker tickers={tickers} perTickDuration={5} />
        <Carousel images={slides} />
        <PromoSpacer />
        <div id='widget-dmw' className='u-clearfix u-my2' /> { /* Pulsa widget container */ }
        <CategoryList categories={categories} />
        <HotList data={hotlists} />
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
      shop_id
      shop_url
      domain
      shop_name
      shop_name_unfmt
      shop_name_clean
      is_gold
      is_official
      location
      logo
      shop_badge
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
  hot_product_home{
    message_status
    success
    data{
      title_enc
      image_url
      price_start_from
      url
    }
  }
}
`

export default graphql(HomeQuery)(HomeView)

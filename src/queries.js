import gql from 'graphql-tag'

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
    wallet {
      linked
      balance
      errors {
        name
        message
      }
    }
  }
  category {
    categories {
      items {
        name
        identifier
        imageURI
        url
      }
      name
    }
    errors {
      name
      message
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
  hot_product_home {
    curr_page
    per_page
    max_page
    items {
      title
      url
      image_url
      price_start_from
    }
  }
  toppicks{
    name
    toppicks{
      name
      url
      image_url
      item{
        name
        url
        image_url
      }
    }
  }
  official_store{
    id
    name
    logo_url
    url
  }
}
`

export default {
  HomeQuery: HomeQuery
}

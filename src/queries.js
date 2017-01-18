import gql from 'graphql-tag'

const UserIsLoggedIn = gql`
query Query {
  user {
    isLoggedIn
  }
}
`

const HomeQuery = gql`
query Query {
  user{
    id
    isLoggedIn
    shouldRedirect
    profilePicture
    name
    email
  }
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
  saldo{
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
const UserDataQuery = gql`
query Query {
  user{
    id
    isLoggedIn
    shouldRedirect
    profilePicture
    name
    email
  }
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
  saldo{
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
`
const FaveQuery = gql`
query Query {
  user{
    id
    isLoggedIn
    shouldRedirect
    profilePicture
    name
    email
  }
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
  saldo{
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
  favorite {
    shop_id
    domain
    shop_name
    shop_url
    shop_url2
    location
    city
    is_gold
    is_official
    img_shop {
      cover
      s_url
      xs_url
      cover_ecs
      s_ecs
      xs_ecs
    }
    products {
      id
      name
      img_url
    }
  }
}
`

const WishlistQueries = {
  getAll: gql`
  query Query($userID: Int!, $query: String!, $count: Int!, $page: Int!) {
    wishlist(user_id:$userID, query: $query, count: $count, page: $page){
      total_data
      items{
        id
        name
        url
        image
        price_formatted
        shop{
          name
          url
          location
        }
        badges{
          title
          image_url
        }
        labels{
          title
          color
        }
        available
        status
      }
    }
  }
  `
}

const ApolloExecutors = (client) => {
  return {
    isUserLoggedIn: () => {
      return client.query({
        forceFetch: true,
        query: UserIsLoggedIn
      })
      .then(result => !result['loading'] && result['data']['user']['isLoggedIn'])
    }
  }
}

export default {
  HomeQuery: HomeQuery,
  UserDataQuery: UserDataQuery,
  UserIsLoggedIn: UserIsLoggedIn,
  ApolloExecutors: ApolloExecutors,
  WishlistQueries: WishlistQueries,
  FaveQuery: FaveQuery
}

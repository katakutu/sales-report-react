// ------------------------------------
// Constants
// ------------------------------------
export const NOTIFICATION_DISPATCH = 'NOTIFICATION_DISPATCH'
export const NOTIFICATION_DISMISS = 'NOTIFICATION_DISMISS'
export const CONNECTION_ONLINE = 'CONNECTION_ONLINE'
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE'
export const USER_SEARCH_ID_STORE = 'USER_SEARCH_ID_STORE'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const STORE_USER_DATA = 'STORE_USER_DATA'

export const APP_IS_LOADING = 'IS_LOADING'
export const APP_IS_NOT_LOADING = 'IS_NOT_LOADING'

// temporary state until we moved to new design and remove sidebar
export const SIDEBAR_STATUS_OPEN = 'SIDEBAR_STATUS_OPEN'
export const SIDEBAR_STATUS_CLOSED = 'SIDEBAR_STATUS_CLOSED'

// ------------------------------------
// Actions
// ------------------------------------
export function notificationDispatch (props) {
  return {
    type: NOTIFICATION_DISPATCH,
    payload: props
  }
}

export function notificationDismiss (id) {
  return {
    type: NOTIFICATION_DISMISS,
    payload: id
  }
}

export function updateConnectionStatus (isOnline) {
  return {
    type: isOnline ? CONNECTION_ONLINE : CONNECTION_OFFLINE,
    payload: isOnline
  }
}

export function storeUserSearchID (userIDHash) {
  return {
    type: USER_SEARCH_ID_STORE,
    payload: userIDHash
  }
}

export function updateUserLoginStatus (isLoggedIn) {
  return {
    type: isLoggedIn ? USER_LOGGED_IN : USER_LOGGED_OUT,
    payload: isLoggedIn
  }
}

export function updateSidebarStatus (isOpen) {
  return {
    type: isOpen ? SIDEBAR_STATUS_OPEN : SIDEBAR_STATUS_CLOSED,
    payload: isOpen
  }
}

export function storeUserData (data) {
  return {
    type: STORE_USER_DATA,
    payload: data
  }
}

export function appIsLoading (isLoading) {
  return {
    type: isLoading ? APP_IS_LOADING : APP_IS_NOT_LOADING,
    payload: isLoading
  }
}

export const actions = {
  notificationDispatch,
  notificationDismiss,
  updateConnectionStatus,
  storeUserSearchID,
  updateUserLoginStatus,
  updateSidebarStatus,
  storeUserData,
  appIsLoading
}

const ACTION_HANDLERS = {
  [NOTIFICATION_DISPATCH] : (state, action) => {
    return Object.assign({}, state, {
      notifications: state.notifications.concat(action.payload)
    })
  },
  [NOTIFICATION_DISMISS]: (state, action) => {
    return Object.assign({}, state, {
      notifications: state.notifications.filter(s => s['id'] !== action.payload)
    })
  },
  [CONNECTION_ONLINE]: (state, action) => {
    return Object.assign({}, state, { isOnline: action.payload })
  },
  [CONNECTION_OFFLINE]: (state, action) => {
    return Object.assign({}, state, { isOnline: action.payload })
  },
  [USER_SEARCH_ID_STORE]: (state, action) => {
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, { searchID: action.payload })
    })
  },
  [USER_LOGGED_IN]: (state, action) => {
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, { loggedIn: action.payload })
    })
  },
  [USER_LOGGED_OUT]: (state, action) => {
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, { loggedIn: action.payload })
    })
  },
  [SIDEBAR_STATUS_OPEN]: (state, action) => {
    return Object.assign({}, state, { sidebarIsOpen: action.payload })
  },
  [SIDEBAR_STATUS_CLOSED]: (state, action) => {
    return Object.assign({}, state, { sidebarIsOpen: action.payload })
  },
  [STORE_USER_DATA]: (state, action) => {
    return Object.assign({}, state, {
      user: Object.assign({}, state.user, { data: action.payload })
    })
  },
  [APP_IS_LOADING]: (state, action) => {
    return Object.assign({}, state, { isLoading: action.payload })
  },
  [APP_IS_NOT_LOADING]: (state, action) => {
    return Object.assign({}, state, { isLoading: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  sidebarIsOpen: false,
  isOnline: true,
  isLoading: false,
  notifications: [],
  user: {
    loggedIn: false,
    searchID: '-',
    data: {
      id: '',
      name: '-',
      profilePicutre: '',
      deposit: 'Rp 0',
      points: 'Rp 0',
      notifications: {
        'sales': {
          'sales_new_order': 0,
          'sales_shipping_status': 0,
          'sales_shipping_confirm': 0
        },
        'inbox': {
          'inbox_talk': 0,
          'inbox_ticket': 0,
          'inbox_review': 0,
          'inbox_friend': 0,
          'inbox_wishlist': 0,
          'inbox_message': 0,
          'inbox_reputation': 0
        },
        'purchase': {
          'purchase_reorder': 0,
          'purchase_payment_conf': 0,
          'purchase_payment_confirm': 0,
          'purchase_order_status': 0,
          'purchase_delivery_confirm': 0
        },
        'total_notif': 0,
        'total_cart': 0,
        'incr_notif': null,
        'resolution': 0
      }

    }
  }
}
export default function appReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

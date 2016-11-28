export const NOTIFICATION_DISPATCH = 'NOTIFICATION_DISPATCH'
export const NOTIFICATION_DISMISS = 'NOTIFICATION_DISMISS'
export const CONNECTION_ONLINE = 'CONNECTION_ONLINE'
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE'
export const USER_SEARCH_ID_STORE = 'USER_SEARCH_ID_STORE'

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

export const actions = {
  notificationDispatch,
  notificationDismiss,
  updateConnectionStatus,
  storeUserSearchID
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
    return Object.assign({}, state, { user: { searchID: action.payload } })
  }
}

const initialState = { isOnline: true, notifications: [], user: { searchID: '-' } }
export default function appReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

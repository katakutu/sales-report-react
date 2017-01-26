import ArrayHelper from '../../lib/utils/ArrayHelper'

// ------------------------------------
// Constants
// ------------------------------------
export const REPLACE_FEEDS = 'REPLACE_FEEDS'
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_QUERY = 'UPDATE_QUERY'

// ------------------------------------
// Actions
// ------------------------------------
export function replaceFeeds (newFeeds) {
  return {
    type    : REPLACE_FEEDS,
    payload : newFeeds
  }
}

export function updatePage (page) {
  return {
    type: UPDATE_PAGE,
    payload: page
  }
}

export function updateQuery (query) {
  return {
    type: UPDATE_QUERY,
    payload: query
  }
}

export const actions = {
  updatePage,
  updateQuery
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REPLACE_FEEDS] : (state, action) => {
    const oldIDs = state.feeds.map(fd => fd['id'])
    const newIDs = action.payload.map(fd => fd['id'])
    if (ArrayHelper.equals(oldIDs, newIDs)) {
      return Object.assign({}, state)
    }

    const newData = action.payload.map(d => Object.assign({}, d, { isActive: true }))

    return Object.assign({}, state, { feeds: newData })
  },
  [UPDATE_PAGE]: (state, action) => {
    return Object.assign({}, state, { page: action.payload })
  },
  [UPDATE_QUERY]: (state, action) => {
    return Object.assign({}, state, { query: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  feeds: [],
  page: 1,
  query: ''
}
export default function feedReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

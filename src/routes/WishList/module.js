import ArrayHelper from '../../lib/utils/ArrayHelper'

// ------------------------------------
// Constants
// ------------------------------------
export const REMOVE_WISHLIST = 'REMOVE_WISHLIST'
export const REPLACE_WISHLISTS = 'REPLACE_WISHLISTS'
export const DEACTIVATE_WISHLIST = 'DEACTIVATE_WISHLIST'
export const ACTIVATE_WISHLIST = 'ACTIVATE_WISHLIST'
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_QUERY = 'UPDATE_QUERY'

// ------------------------------------
// Actions
// ------------------------------------
export function removeWishlist (productID) {
  return {
    type: REMOVE_WISHLIST,
    payload: productID
  }
}

export function replaceWishlists (newWishlists) {
  return {
    type    : REPLACE_WISHLISTS,
    payload : newWishlists
  }
}

export function deactivateWishlist (productID) {
  return {
    type: DEACTIVATE_WISHLIST,
    payload: productID
  }
}

export function activateWishlist (productID) {
  return {
    type: ACTIVATE_WISHLIST,
    payload: productID
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
  activateWishlist,
  deactivateWishlist,
  replaceWishlists,
  updatePage,
  updateQuery
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REMOVE_WISHLIST]: (state, action) => {
    const newWishlists = state.wishlists.filter((wl) => wl['id'] !== action.payload)

    return Object.assign({}, state, { wishlists: newWishlists })
  },
  [REPLACE_WISHLISTS] : (state, action) => {
    const oldIDs = state.wishlists.map(wl => wl['id'])
    const newIDs = action.payload.map(wl => wl['id'])
    if (ArrayHelper.equals(oldIDs, newIDs)) {
      return Object.assign({}, state)
    }

    const newData = action.payload.map(d => Object.assign({}, d, { isActive: true }))

    return Object.assign({}, state, { wishlists: newData })
  },
  [ACTIVATE_WISHLIST]: (state, action) => {
    const newData = state.wishlists.map(w => {
      if (parseInt(w['id']) === action.payload) {
        return Object.assign({}, w, { isActive: true })
      } else {
        return w
      }
    })

    return Object.assign({}, state, { wishlists: newData })
  },
  [DEACTIVATE_WISHLIST]: (state, action) => {
    const newData = state.wishlists.map(w => {
      if (parseInt(w['id']) === action.payload) {
        return Object.assign({}, w, { isActive: false })
      } else {
        return w
      }
    })

    return Object.assign({}, state, { wishlists: newData })
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
  wishlists: [],
  page: 1,
  query: ''
}
export default function wishlistReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

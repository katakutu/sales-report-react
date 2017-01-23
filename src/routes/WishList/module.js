// ------------------------------------
// Constants
// ------------------------------------
export const ADD_WISHLISTS = 'ADD_WISHLISTS'
export const REPLACE_WISHLISTS = 'REPLACE_WISHLISTS'
export const CLEAR_WISHLISTS = 'CLEAR_WISHLISTS'
export const DEACTIVATE_WISHLIST = 'DEACTIVATE_WISHLIST'
export const ACTIVATE_WISHLIST = 'ACTIVATE_WISHLIST'
export const UPDATE_TOTAL_WISHLIST = 'UPDATE_TOTAL_WISHLIST'
export const UPDATE_NEXT_PAGE = 'UPDATE_NEXT_PAGE'

// ------------------------------------
// Actions
// ------------------------------------
export function addWishlist (newWishlists) {
  return {
    type    : ADD_WISHLISTS,
    payload : newWishlists
  }
}

export function replaceWishlists (newWishlists) {
  return {
    type    : REPLACE_WISHLISTS,
    payload : newWishlists
  }
}

export function clearWishlists () {
  return {
    type: CLEAR_WISHLISTS,
    payload: []
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

export function updateTotalWishlist (count) {
  return {
    type: UPDATE_TOTAL_WISHLIST,
    payload: count
  }
}

export function updateHasNextPage (hasNextPage) {
  return {
    type: UPDATE_NEXT_PAGE,
    payload: hasNextPage
  }
}

export const actions = {
  activateWishlist,
  addWishlist,
  clearWishlists,
  deactivateWishlist,
  replaceWishlists,
  updateHasNextPage,
  updateTotalWishlist
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_WISHLISTS]     : (state, action) => {
    const oldData = state.wishlists.map(w => w['id'])
    const newData = action.payload.filter(d => !oldData.includes(d['id'])).map(d => {
      return Object.assign({}, d, { isActive: true })
    })

    return Object.assign({}, state, { wishlists: state.wishlists.concat(newData) })
  },
  [CLEAR_WISHLISTS]   : (state, action) => Object.assign({}, state, { wishlists: [] }),
  [REPLACE_WISHLISTS] : (state, action) => {
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
  [UPDATE_TOTAL_WISHLIST]: (state, action) => {
    return Object.assign({}, state, { totalWishlist: action.payload })
  },
  [UPDATE_NEXT_PAGE]: (state, action) => {
    return Object.assign({}, state, { hasNextPage: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  hasNextPage: false,
  totalWishlist: 0,
  wishlists: []
}
export default function wishlistReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

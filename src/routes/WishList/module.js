// ------------------------------------
// Constants
// ------------------------------------
export const ADD_WISHLISTS = 'ADD_WISHLISTS'
export const REPLACE_WISHLISTS = 'REPLACE_WISHLISTS'
export const CLEAR_WISHLISTS = 'CLEAR_WISHLISTS'
export const DEACTIVATE_WISHLIST = 'DEACTIVATE_WISHLIST'
export const ACTIVATE_WISHLIST = 'ACTIVATE_WISHLIST'

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

export const actions = {
  addWishlist, replaceWishlists, clearWishlists
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
        return w
      } else {
        return Object.assign({}, w, { isActive: false })
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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  wishlists: []
}
export default function wishlistReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_WISHLISTS = 'ADD_WISHLISTS'
export const REPLACE_WISHLISTS = 'REPLACE_WISHLISTS'
export const CLEAR_WISHLISTS = 'CLEAR_WISHLISTS'

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

export const actions = {
  addWishlist, replaceWishlists, clearWishlists
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_WISHLISTS]     : (state, action) => {
    return Object.assign(state, { wishlists: state.wishlists.concat(action.payload) })
  },
  [CLEAR_WISHLISTS]   : (state, action) => Object.assign(state, { wishlists: [] }),
  [REPLACE_WISHLISTS] : (state, action) => Object.assign(state, { wishlists: action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  wishlists: []
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
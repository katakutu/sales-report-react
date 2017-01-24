// ------------------------------------
// Constants
// ------------------------------------
export const ADD_FAVORITES = 'ADD_FAVORITES'
export const REPLACE_FAVORITES = 'REPLACE_FAVORITES'
export const CLEAR_FAVORITES = 'CLEAR_FAVORITES'
export const DEACTIVATE_FAVORITE = 'DEACTIVATE_FAVORITE'
export const ACTIVATE_FAVORITE = 'ACTIVATE_FAVORITE'
export const UPDATE_TOTAL_FAVORITE = 'UPDATE_TOTAL_FAVORITE'
export const UPDATE_NEXT_PAGE = 'UPDATE_NEXT_PAGE'
export const UPDATE_QUERY = 'UPDATE_QUERY'

// ------------------------------------
// Actions
// ------------------------------------
export function addFavorite (newFavortes) {
  return {
    type    : ADD_FAVORITES,
    payload : newFavorites
  }
}

export function replaceFavorites (newFavorites) {
  return {
    type    : REPLACE_FAVORITES,
    payload : newFavorites
  }
}

export function clearFavorites () {
  return {
    type: CLEAR_FAVORITES,
    payload: []
  }
}

export function deactivateFavorite (productID) {
  return {
    type: DEACTIVATE_FAVORITE,
    payload: productID
  }
}

export function activateFavorite (productID) {
  return {
    type: ACTIVATE_FAVORITE,
    payload: productID
  }
}

export function updateTotalFavorite (count) {
  return {
    type: UPDATE_TOTAL_FAVORITE,
    payload: count
  }
}

export function updateHasNextPage (hasNextPage) {
  return {
    type: UPDATE_NEXT_PAGE,
    payload: hasNextPage
  }
}

export function updateQuery (query) {
  return {
    type: UPDATE_QUERY,
    payload: query
  }
}

export const actions = {
  activateFavorite,
  addFavorite,
  clearFavorites,
  deactivateFavorite,
  replaceFavorites,
  updateHasNextPage,
  updateTotalFavorite,
  updateQuery
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_FAVORITES]     : (state, action) => {
    const oldData = state.favorites.map(w => w['id'])
    const newData = action.payload.filter(d => !oldData.includes(d['id'])).map(d => {
      return Object.assign({}, d, { isActive: true })
    })
    console.log("msk module ADD_FAVORITES")
    return Object.assign({}, state, { favorites: state.favorites.concat(newData) })
  },
  [CLEAR_FAVORITES]   : (state, action) => Object.assign({}, state, { favorites: [] }),
  [REPLACE_FAVORITES] : (state, action) => {
    const newData = action.payload.map(d => Object.assign({}, d, { isActive: true }))

    return Object.assign({}, state, { favorites: newData })
  },
  [ACTIVATE_FAVORITE]: (state, action) => {
    const newData = state.favorites.map(w => {
      if (parseInt(w['id']) === action.payload) {
        return Object.assign({}, w, { isActive: true })
      } else {
        return w
      }
    })

    return Object.assign({}, state, { favorites: newData })
  },
  [DEACTIVATE_FAVORITE]: (state, action) => {
    const newData = state.favorites.map(w => {
      if (parseInt(w['id']) === action.payload) {
        return Object.assign({}, w, { isActive: false })
      } else {
        return w
      }
    })

    return Object.assign({}, state, { favorites: newData })
  },
  [UPDATE_TOTAL_FAVORITE]: (state, action) => {
    return Object.assign({}, state, { totalFavorite: action.payload })
  },
  [UPDATE_NEXT_PAGE]: (state, action) => {
    return Object.assign({}, state, { hasNextPage: action.payload })
  },
  [UPDATE_QUERY]: (state, action) => {
    return Object.assign({}, state, { query: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  hasNextPage: false,
  totalFavorite: 0,
  Favorites: [],
  query: ''
}
export default function favoriteReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
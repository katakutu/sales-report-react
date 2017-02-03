import ArrayHelper from '../../lib/utils/ArrayHelper'
// ------------------------------------
// Constants
// ------------------------------------
export const REPLACE_FAVORITES = 'REPLACE_FAVORITES'
export const DEACTIVATE_FAVORITE = 'DEACTIVATE_FAVORITE'
export const ACTIVATE_FAVORITE = 'ACTIVATE_FAVORITE'
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_QUERY = 'UPDATE_QUERY'

// ------------------------------------
// Actions
// ------------------------------------

export function replaceFavorites (newFavorites) {
  return {
    type    : REPLACE_FAVORITES,
    payload : newFavorites
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

export function updatePage (hasNextPage) {
  return {
    type: UPDATE_PAGE,
    payload: hasNextPage
  }
}

export function updateQuery (query) {
  console.log(query)
  return {
    type: UPDATE_QUERY,
    payload: query
  }
}

export const actions = {
  activateFavorite,
  deactivateFavorite,
  replaceFavorites,
  updatePage,
  updateQuery
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REPLACE_FAVORITES] : (state, action) => {
    const oldIDs = state.favorites.map(fd => {
      return fd['kind'] === 'favorites' && fd['items'].map(c => (c['shop_id']))
    })
    const newIDs = action.payload.map(ta => {
      return ta['kind'] === 'favorites' && ta['items'].map(x => (x['shop_id']))
    })
    if (ArrayHelper.equals2DFeed(oldIDs, newIDs)) {
      return Object.assign({}, state)
    }

    return Object.assign({}, state, { favorites: action.payload })
  },
  [ACTIVATE_FAVORITE]: (state, action) => {
    const newData = state.favorites.map(f => {
      const newF = f.items.map(fave => {
        if (parseInt(fave['shop_id']) === action.payload) {
          return Object.assign({}, fave, { is_active: true })
        } else {
          return fave
        }
      })
      return Object.assign({}, f, { items: newF })
    })

    return Object.assign({}, state, { favorites: newData })
  },
  [DEACTIVATE_FAVORITE]: (state, action) => {
    const newData = state.favorites.map(f => {
      const newF = f.items.map(fave => {
        if (parseInt(fave['shop_id']) === action.payload) {
          return Object.assign({}, fave, { is_active: false })
        } else {
          return fave
        }
      })
      return Object.assign({}, f, { items: newF })
    })

    return Object.assign({}, state, { favorites: newData })
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
  favorites: [],
  page: 1,
  query: ''
}
export default function favoriteReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

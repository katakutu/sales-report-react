// @flow
import createStore from './createStore'

const store = createStore(window.___INITIAL_STATE__) // eslint-disable-line no-underscore-dangle
export default store
const { dispatch, getState } = store
export { dispatch, getState }

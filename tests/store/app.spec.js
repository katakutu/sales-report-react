import {
    NOTIFICATION_DISPATCH,
    NOTIFICATION_DISMISS,
    CONNECTION_ONLINE,
    CONNECTION_OFFLINE,
    USER_SEARCH_ID_STORE,
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    notificationDispatch,
    notificationDismiss,
    updateConnectionStatus,
    storeUserSearchID,
    updateUserLoginStatus,
    default as appReducer
} from 'store/app'

describe('(Internal Module) App', () => {
  it('Should export a constant NOTIFICATION_DISPATCH', () => {
    expect(NOTIFICATION_DISPATCH).to.equal('NOTIFICATION_DISPATCH')
  })

  it('Should export a constant NOTIFICATION_DISMISS', () => {
    expect(NOTIFICATION_DISMISS).to.equal('NOTIFICATION_DISMISS')
  })

  it('Should export a constant CONNECTION_ONLINE', () => {
    expect(CONNECTION_ONLINE).to.equal('CONNECTION_ONLINE')
  })

  it('Should export a constant CONNECTION_OFFLINE', () => {
    expect(CONNECTION_OFFLINE).to.equal('CONNECTION_OFFLINE')
  })

  it('Should export a constant USER_SEARCH_ID_STORE', () => {
    expect(USER_SEARCH_ID_STORE).to.equal('USER_SEARCH_ID_STORE')
  })

  it('Should export a constant USER_LOGGED_IN', () => {
    expect(USER_LOGGED_IN).to.equal('USER_LOGGED_IN')
  })

  it('Should export a constant USER_LOGGED_OUT', () => {
    expect(USER_LOGGED_OUT).to.equal('USER_LOGGED_OUT')
  })

  describe('(Reducer)', () => {
    let initialState

    before(() => {
      initialState = appReducer(undefined, {})
    })

    it('Should be a function', () => {
      expect(appReducer).to.be.a('function')
    })

    it('Should be initialized with online status', () => {
      expect(initialState['isOnline']).to.equal(true)
    })

    it('Should be initialized with empty array as notification', () => {
      expect(Array.isArray(initialState['notifications'])).to.equal(true)
      expect(initialState['notifications'].length).to.equal(0)
    })

    it('Should be initialized with logged out user', () => {
      expect(initialState['user']['loggedIn']).to.equal(false)
    })

    it('Should be initialized with "-" search id', () => {
      expect(initialState['user']['searchID']).to.equal('-')
    })

    it('Should return previous state if an action was not matched', () => {
      let state = appReducer(undefined, {})
      expect(state['isOnline']).to.equal(true)
      expect(state['notifications'].length).to.equal(0)
      expect(state['user']['loggedIn']).to.equal(false)
      expect(state['user']['searchID']).to.equal('-')

      state = appReducer(state, { type: 'UNKNOWN_STATE' })
      expect(state['isOnline']).to.equal(true)
      expect(state['notifications'].length).to.equal(0)
      expect(state['user']['loggedIn']).to.equal(false)
      expect(state['user']['searchID']).to.equal('-')

      const offlineState = Object.assign({}, state, { isOnline: false })
      state = appReducer(state, updateConnectionStatus(offlineState['isOnline']))
      expect(state['isOnline']).to.equal(offlineState['isOnline'])
      state = appReducer(state, { type: 'UNKNOWN_STATE' })
      expect(state['isOnline']).to.equal(offlineState['isOnline'])
    })
  })

  describe('(Action Creator) notificationDispatch', () => {
    const prop = {
      id: (new Date().getTime()).toString(),
      active: true,
      label: 'Anda sedang offline',
      text: 'Mohon cek koneksi anda.',
      timeout: 3000
    }

    it('Should be exported as a function', () => {
      expect(notificationDispatch).to.be.a('function')
    })

    it('Should return an action with type "NOTIFICATION_DISPATCH"', () => {
      expect(notificationDispatch()).to.have.property('type', NOTIFICATION_DISPATCH)
    })

    it('Should assign first argument to the "payload" property', () => {
      expect(notificationDispatch(prop)).to.have.property('payload', prop)
    })

    it('Should add new notification to state', () => {
      let initialState = appReducer(undefined, {})
      let finalState = appReducer(initialState, notificationDispatch(prop))

      let finalNotifCount = finalState['notifications'].length
      let initialNotifCount = initialState['notifications'].length
      expect(finalNotifCount).to.equal(initialNotifCount + 1)
    })
  })

  describe('(Action Creator) notificationDismiss', () => {
    const prop = {
      id: (new Date().getTime()).toString(),
      active: true,
      label: 'Anda sedang offline',
      text: 'Mohon cek koneksi anda.',
      timeout: 3000
    }

    it('Should be exported as a function', () => {
      expect(notificationDismiss).to.be.a('function')
    })

    it('Should return an action with type "NOTIFICATION_DISMISS"', () => {
      expect(notificationDismiss()).to.have.property('type', NOTIFICATION_DISMISS)
    })

    it('Should assign first argument to the "payload" property', () => {
      const arg = 10
      expect(notificationDismiss(arg)).to.have.property('payload', arg)
    })

    it('Should remove a notification from state', () => {
      let initialState = appReducer(undefined, {})
      let dispatchedState = appReducer(initialState, notificationDispatch(prop))
      let finalState = appReducer(dispatchedState, notificationDismiss(prop.id))

      let finalNotifCount = finalState['notifications'].length
      let dispatchedNotifCount = dispatchedState['notifications'].length
      let initialNotifCount = initialState['notifications'].length
      expect(finalNotifCount).to.equal(initialNotifCount)
      expect(finalNotifCount).to.equal(dispatchedNotifCount - 1)
    })
  })

  describe('(Actor Creator) updateConnectionStatus', () => {
    it('Should be exported as a function', () => {
      expect(updateConnectionStatus).to.be.a('function')
    })

    it('Should return an action with type "CONNECTION_ONLINE" if first argument is true', () => {
      expect(updateConnectionStatus(true)).to.have.property('type', CONNECTION_ONLINE)
    })

    it('Should return an action with type "CONNECTION_OFFLINE" if first argument is false', () => {
      expect(updateConnectionStatus(false)).to.have.property('type', CONNECTION_OFFLINE)
    })

    it('Should assign first argument to the "payload" property', () => {
      expect(updateConnectionStatus(true)).to.have.property('payload', true)
      expect(updateConnectionStatus(false)).to.have.property('payload', false)
    })

    it('Should update the isOnline state', () => {
      let initialState = appReducer(undefined, {})
      let midState = appReducer(initialState, updateConnectionStatus(!initialState['isOnline']))
      expect(midState['isOnline']).to.equal(!initialState['isOnline'])

      let finalState = appReducer(midState, updateConnectionStatus(!midState['isOnline']))
      expect(finalState['isOnline']).to.equal(!midState['isOnline'])
    })
  })

  describe('(Actor Creator) storeUserSearchID', () => {
    it('Should be exported as a function', () => {
      expect(storeUserSearchID).to.be.a('function')
    })

    it('Should return an action with type "USER_SEARCH_ID_STORE"', () => {
      expect(storeUserSearchID('')).to.have.property('type', USER_SEARCH_ID_STORE)
    })

    it('Should assign first argument to the "payload" property', () => {
      const arg = '12345'
      expect(storeUserSearchID(arg)).to.have.property('payload', arg)
    })

    it('Should update the user.searchID state', () => {
      const searchID = '12345'

      let initialState = appReducer(undefined, {})
      let finalState = appReducer(initialState, storeUserSearchID(searchID))

      expect(finalState['user']['searchID']).to.not.equal(initialState['user']['searchID'])
      expect(finalState['user']['searchID']).to.equal(searchID)
    })
  })

  describe('(Actor Creator) updateUserLoginStatus', () => {
    it('Should be exported as a function', () => {
      expect(updateUserLoginStatus).to.be.a('function')
    })

    it('Should return an action with type "USER_LOGGED_IN" if first argument is true', () => {
      expect(updateUserLoginStatus(true)).to.have.property('type', USER_LOGGED_IN)
    })

    it('Should return an action with type "USER_LOGGED_OUT" if first argument is false', () => {
      expect(updateUserLoginStatus(false)).to.have.property('type', USER_LOGGED_OUT)
    })

    it('Should assign first argument to the "payload" property', () => {
      expect(updateUserLoginStatus(true)).to.have.property('payload', true)
      expect(updateUserLoginStatus(false)).to.have.property('payload', false)
    })

    it('Should update the user.loggedIn state', () => {
      let initialState = appReducer(undefined, {})
      let midState = appReducer(initialState, updateUserLoginStatus(!initialState['user']['loggedIn']))
      expect(midState['user']['loggedIn']).to.equal(!initialState['user']['loggedIn'])

      let finalState = appReducer(midState, updateUserLoginStatus(!midState['user']['loggedIn']))
      expect(finalState['user']['loggedIn']).to.equal(!midState['user']['loggedIn'])
    })
  })
})

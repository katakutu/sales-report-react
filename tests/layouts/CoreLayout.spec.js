import React from 'react'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import createStore from 'store/createStore'

describe('(Layout) Core', function () {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      store: createStore({}),
      isOnline: false,
      notifications: [],
      ...bindActionCreators({
        notificationDismiss : (_spies.notificationDismiss = sinon.spy()),
        notificationDispatch : (_spies.notificationDispatch = sinon.spy()),
        updateConnectionStatus: (_spies.updateConnectionStatus = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<CoreLayout {..._props}><div /></CoreLayout>)
  })

  it('Should render as a <CoreLayout>.', () => {
    expect(_wrapper.is('CoreLayout')).to.equal(true)
  })
})

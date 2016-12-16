import React, { Component } from 'react'
import './HotListView.scss'
import HotList from '../../../components/HotList'
import HeaderHomeOld from '../../../components/HeaderHomeOld'

class HotListView extends Component {
  render () {
    return (
      <div>
        <HeaderHomeOld />
        <p class='u-clearfix'>
          Hot List Code Goes Here
        </p>
      </div>
    )
  }
}

export default HotListView

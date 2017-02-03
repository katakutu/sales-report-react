import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './Tab.scss'

import { SLUG } from '../digitalconstants'
import { SITES } from '../../../constants'

class Tab extends Component {
  static propTypes = {
    categoryList: PropTypes.array,
    activeTab: PropTypes.string,
    changeTab: PropTypes.func
  }

  constructor (props) {
    super(props)

    let shownTabs = []
    shownTabs.push(props.categoryList[0] ? props.categoryList[0].icon : '')
    shownTabs.push(props.categoryList[1] ? props.categoryList[1].icon : '')
    if (this.props.activeTab) {
      if (shownTabs.indexOf(this.props.activeTab) < 0) {
        shownTabs.push(this.props.activeTab)
      } else {
        // item ketiga yang ingin dimunculkan di tab
        shownTabs.push(this.props.categoryList[2] ? props.categoryList[2].icon : '')
      }
    } else {
      // item ketiga yang ingin dimunculkan di tab
      shownTabs.push(this.props.categoryList[2].icon ? props.categoryList[0].icon : '')
    }

    this.state = {
      activeTab: this.props.activeTab ? this.props.activeTab : 'pulsa',
      shownTabs: shownTabs,
      modalOpened: false
    }

    this.renderCategory = this.renderCategory.bind(this)
    this.renderOtherCategory = this.renderOtherCategory.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  isTabShown (name) {
    if (this.state.shownTabs.indexOf(name) < 0) {
      return false
    } else {
      return true
    }
  }

  isItemInModal (name) {
    if (this.isTabShown(name)) {
      if (this.state.activeTab === name) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

  handleOpenModal () {
    this.setState({
      modalOpened: true
    })
  }

  handleCloseModal () {
    this.setState({
      modalOpened: false
    })
  }

  handleTabChange (data) {
    if (!SLUG[data.icon]) {
      window.location = SITES['Pulsa'] + '/' + data.slug
    } else {
      this.setState({
        activeTab: data.icon,
        modalOpened: false
      })

      if (this.state.shownTabs.indexOf(data.icon) < 0) {
        this.state.shownTabs.pop()
        this.state.shownTabs.push(data.icon)
      }

      this.props.changeTab(data.icon)
    }
  }

  renderOtherCategory (data, index) {
    return (
      <li
        className={classNames('dp-modal__item', { 'u-hide': !this.isItemInModal(data.icon) })}
        onClick={() => this.handleTabChange(data)}
        key={`digital-other-category-${data.name}`}>
        <a
          className={classNames('dp-tab__url', 'u-mt2', { 'active': this.state.activeTab === data.icon })}>
          <i className={'dp-tab__icon dp-tab__icon--' + data.icon} />
          <div className='dp-tab__name'>{data.name}</div>
        </a>
      </li>
    )
  }

  renderCategory (data, index) {
    return (
      <li
        className={classNames('dp-tab__item', { 'u-hide': !this.isTabShown(data.icon) })}
        onClick={() => this.handleTabChange(data)}
        key={`digital-category-${data.id}`}>
        <a
          className={classNames('dp-tab__url', { 'active': this.state.activeTab === data.icon })}>
          <i className={'dp-tab__icon dp-tab__icon--' + data.icon} />
          <div className='dp-tab__name'>{data.name}</div>
        </a>
      </li>
    )
  }

  render () {
    return (
      <nav className='dp-tab u-clearfix'>
        <ul className='dp-tab__container'>
          {this.props.categoryList.map(this.renderCategory)}
          <li className='dp-tab__item' onClick={this.handleOpenModal}>
            <Link className='dp-tab__url'>
              <i className='dp-tab__icon dp-tab__icon--others' />
              <div className='dp-tab__name'>Lainnya</div>
            </Link>
          </li>
        </ul>
        <div className={classNames('dp-tab__overlay', { 'u-hide': !this.state.modalOpened })} />
        <div className={classNames('dp-tab__modal', { 'u-hide': !this.state.modalOpened })}>
          <div className='dp-modal__box'>
            <div className='dp-modal__title'>
              Produk Lainnya
              <div className='dp-modal__close' onClick={this.handleCloseModal} />
            </div>
            <ul className='dp-modal__tab'>
              {this.props.categoryList.map(this.renderOtherCategory)}
            </ul>
          </div>
        </div>
        { this.state.modalOpened && <BodyClassName className='u-body-overflow-no-scroll' /> }
      </nav>
    )
  }
}

export default Tab

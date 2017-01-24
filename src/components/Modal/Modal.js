import React, { Component } from 'react'
import './Modal.scss'

class Modal extends Component {
  static propTypes = {
    contentModal: React.PropTypes.object,
    eventModal: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.renderIcon = this.renderIcon.bind(this)
    this.renderText = this.renderText.bind(this)
  }

  renderIcon (val) {
    return (
      <div className='span2 text-left'>
        <img className='w-50' src={val} />
      </div>
    )
  }

  renderText (val, title) {
    let content
    if (title === 'title') {
      content = <p className='fs-12 mb-0'><strong>{val}</strong></p>
    } else if (title === 'content') {
      content = <p className='fs-12 mb-0'>{val}</p>
    }
    return content
  }

  render () {
    let tamp = []
    let link

    if (this.props.contentModal) {
      let that = this
      this.props.contentModal.data.forEach(function (item, index) {
        tamp.push(
          <div className='row-fluid mb-5' key={`modal-content-item-${index}`}>
            { item.icon && that.renderIcon(item.icon) }
            <div className='span10'>
              { item.title && that.renderText(item.title, 'title') }
              { item.content && that.renderText(item.content, 'content') }
            </div>
          </div>
        )
      })
      if (this.props.contentModal.link && this.props.contentModal.linkText) {
        link = <div className='row-fluid mt-20'>
          <div className='span12 text-center'>
            <a className='new-btn-success'
              href={this.props.contentModal.link}
              target='_blank'>{this.props.contentModal.linkText}</a>
          </div>
        </div>
      }
    }

    return (
      <div>
        <div className='drawer-active__overlay'>
          <div className='close-promote' onClick={() => this.props.eventModal(false)}>x</div>
          <div className='promote-inform'>
            <div className='list-topads'>
              <div className='popover-content'>
                {tamp}
                {link}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal

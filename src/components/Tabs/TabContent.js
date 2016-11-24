import React, { Component } from 'react'
import classnames from 'classnames'
import './Tabs.scss'

class TabContent extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    tabIndex: React.PropTypes.number
  }

  static defaultProps = {
    isActive: false,
    className: ''
  }

  render () {
    const _className = classnames(
            this.props.className,
            { 'tab-content__hidden': !this.props.isActive }
        )

    return (
      <section className={_className} tabIndex={this.props.tabIndex}>
        {this.props.children}
      </section>
    )
  }
}

export default TabContent

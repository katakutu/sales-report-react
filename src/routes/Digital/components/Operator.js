import React, { Component, PropTypes } from 'react'

import './Operator.scss'
import { SITES } from '../../../constants'

class Operator extends Component {
  static propTypes = {
    operatorList: PropTypes.array
  }

  renderOperator (data, index) {
    const validImage = data.image.match(/\.(jpeg|jpg|gif|png)$/)
    if (data.show_product_list && data.slug !== '' && data.image !== '' && validImage) {
      return (
        <li key={index}>
          <a href={SITES['Pulsa'] + '/' + data.slug}>
            <picture>
              <img src={data.image} alt={data.name} title={data.name} />
            </picture>
          </a>
        </li>
      )
    } else {
      return
    }
  }

  render () {
    return (
      <div className='u-center u-py1 wrapper dp-operator__container'>
        <ul className='u-list-style-none u-mb0 u-pl0'>
          {this.props.operatorList.map(this.renderOperator)}
        </ul>
      </div>
    )
  }
}

export default Operator

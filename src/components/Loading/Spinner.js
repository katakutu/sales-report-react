import React, { Component } from 'react'
import './Spinner.scss'

class Spinner extends Component {
    render() {
        return (
            <div className='loading__wrap'>
                <div className='loading__line-mask'>
                    <div className='loading__line' />
                </div>
                <div className='loading__image' />
            </div>
        )
    }
}

export default Spinner
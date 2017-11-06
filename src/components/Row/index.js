import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Row extends Component {
    render() {
        let cells = this.props.data.map((el, i) => {
            return (
                <div className={'cell'} key={i}>{el}</div>
            )
        });
        return <div className='row'>
            {cells}
        </div>
    }
}
Row.propTypes = {
    data: PropTypes.array.isRequired
};

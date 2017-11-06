import React, {Component} from 'react'
import {connect} from 'react-redux'
import Row from '../../components/Row'

class Table extends Component {
    render() {
        if (!this.props.file.hasOwnProperty('data')) {
            return <div className={'error'}>No such file</div>;
        }
        const data = this.props.file.data;
        const rows = data.map((el, i) => {
            return (
                el.length === data[0].length ? <Row data={el} key={i}/> : ''
            )
        });
        return <div className='table'>
            {rows}
        </div>
    }
}

function mapStateToProps(state) {
    return {
        file: state.file
    }
}

export default connect(mapStateToProps)(Table)
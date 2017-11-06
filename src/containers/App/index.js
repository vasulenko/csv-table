import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as fileActions from '../../actions/FileActions'
import FileUploader from '../../components/FileUploader'
import Table from '../Table'

class App extends Component {
    render() {
        const {fetchFile, updateFile} = this.props.fileActions;
        return <div className='app'>
            <FileUploader fetchFile={fetchFile} updateFile={updateFile}/>
            <Table/>
        </div>
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {
        fileActions: bindActionCreators(fileActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
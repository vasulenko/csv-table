import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FileUploader extends Component {
    onFileUpload() {
        if (!document.getElementsByName('file')[0].files[0]) return;
        const file = document.getElementsByName('file')[0].files[0];
        if (file.name === 'deltas.csv') {
            this.props.updateFile(file);
        }
        else {
            this.props.fetchFile(file);
        }
    }

    render() {
        return <div className='file-uploader'>
            <input className={'file-uploader__input'} name={'file'} accept={'.csv'} type="file"
                   onChange={this.onFileUpload.bind(this)}/>
        </div>
    }
}
FileUploader.propTypes = {
    fetchFile: PropTypes.func.isRequired,
    updateFile: PropTypes.func.isRequired
};

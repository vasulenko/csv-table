import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class FileUploader extends Component {
    onFileUpload() {
        if (!document.getElementsByName('file')[0].files[0]) return;
        let file = document.getElementsByName('file')[0].files[0];
        file.name === 'deltas.csv' ? this.props.updateWithDeltas(file) : this.props.fetchFile(file);
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
    updateWithDeltas: PropTypes.func.isRequired
};

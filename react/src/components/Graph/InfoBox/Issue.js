/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Icon from 'material-ui-icons/PriorityHigh';

const buttonPosition = {
    'browser': {
        position: 'absolute',
        right: '15%',
    },
    'extension': {
        position: 'absolute',
        right: '70px',
    },
    'mobile': {
        position: 'absolute',
        right: '1%',
    }
}

const issueButtonStyle = {
    width: '10px',
    minWidth: '10px'
};

class ResponsiveDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        let { fullScreen } = this.props;
        if (this.props.clientType === 'extension' || window.innerWidth > 650) {
            fullScreen = false;
        }

        return (
            <div style={buttonPosition[this.props.clientType]}>
                <Button style={issueButtonStyle} onClick={this.handleClickOpen}><Icon style={{ color: '#e68931' }} /></Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <DialogTitle>{this.props.translate('graph.issue.dialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.translate('graph.issue.dialogContentText')}<br /><br />
                            Google Form : <a href={this.props.translate('graph.issue.form')} target="_blank" rel="noopener noreferrer">{this.props.translate('graph.issue.form')}</a><br />
                            Email : <a href="mailto:contact@metada.org" target="_blank" rel="noopener noreferrer">contact@metada.org</a> {this.props.translate('graph.issue.object')}<br /><br />
                            {this.props.translate('graph.issue.dialogContentText2')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            {this.props.translate('graph.issue.closeButton')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);
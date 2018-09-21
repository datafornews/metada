/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Button from '@material-ui/core/Button';


class IssueDialog extends React.Component {
    state = {
        dialogOpen: false,
    }

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    }

    handleRequestClose = () => {
        this.props.show.issue && this.props.toggleIssue();
    }

    render() {

        let { fullScreen, clientType, show, translate } = this.props;
        if (clientType === 'extension' || window.innerWidth > 650) {
            fullScreen = false;
        }

        return (
            <Dialog
                fullScreen={fullScreen}
                open={show.issue ? true : false}
                onClose={this.handleRequestClose}
            >
                <DialogTitle>{translate('graph.issue.dialogTitle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ fontSize: '0.9rem' }}>
                        {translate('graph.issue.dialogContentText')}<br /><br />
                        Google Form : <a href={translate('graph.issue.form')} target="_blank" rel="noopener noreferrer">{translate('graph.issue.form')}</a><br />
                        Email : <a href="mailto:contact@metada.org" target="_blank" rel="noopener noreferrer">contact@metada.org</a> {translate('graph.issue.object')}<br /><br />
                        {translate('graph.issue.dialogContentText2')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ fontSize: '0.9rem' }} onClick={this.handleRequestClose} color="primary">
                        {translate('graph.issue.closeButton')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

IssueDialog.propTypes = {
    clientType: PropTypes.string.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    show: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

export default withMobileDialog()(IssueDialog);
import React from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleRequestCloseAndReset = () => {
        Object.keys(localStorage).map(
            (v, k) => {
                localStorage.removeItem(v);
                return null;
            }
        );
        Object.keys(sessionStorage).map(
            (v, k) => {
                localStorage.removeItem(v);
                return null;
            }
        );
        this.setState({ open: false });
        if (this.props.clientType === 'extension') {
            window.browser.runtime.reload();
        } else {
            window.location.reload();
        }
    };

    render() {
        return (
            <div >

                <Button color='secondary' variant='flat' onClick={this.handleClickOpen} style={{fontSize:'0.8rem'}}>
                    {this.props.translate('home.settings.resetDialogButton')}
                </Button>
                <Dialog open={this.state.open} onClose={this.handleRequestClose}>
                    <DialogTitle>
                        {this.props.translate('home.settings.resetDialogTitle')}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{fontSize:'0.9rem'}}>
                            {this.props.translate('home.settings.resetDialogContent')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            {this.props.translate('home.settings.resetDialogButtonCancel')}
                        </Button>
                        <Button onClick={this.handleRequestCloseAndReset} color="primary" autoFocus>
                            {this.props.translate('home.settings.resetDialogButtonYes')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

export default AlertDialog;
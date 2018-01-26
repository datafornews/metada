import React, { Component } from 'react';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Auth from './Auth/Auth';
import EditProfile from './EditProfile/EditProfile';

const fullScreenMinWidth = 550;

const profileStyle = {
    position: 'relative',
    fontSize: '0.8em',
    borderBottom: '1px solid grey'
}

class ProfileDialog extends Component {

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
        if (this.props.clientType === 'extension' || window.innerWidth > fullScreenMinWidth) {
            fullScreen = false;
        }

        return (
            <div>
                {
                    this.props.user.isLoggedIn && <div style={profileStyle} onClick={this.handleClickOpen}>
                        Hi, {this.props.user.data.first_name || this.props.user.data.username}
                    </div>
                }
                {
                    !this.props.user.isLoggedIn && <div style={profileStyle} onClick={this.handleClickOpen}>
                        Log in or Signup
                    </div>
                }
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                >
                    <DialogTitle>{this.props.translate('home.intro.dialogButton')}</DialogTitle>
                    <DialogContent>
                        <div style={{ textAlign: 'center' }}>
                            <Auth {...this.props} />
                            {this.props.user.isValid && <EditProfile {...this.props} />}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            {this.props.translate('home.intro.closeButton')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ProfileDialog;
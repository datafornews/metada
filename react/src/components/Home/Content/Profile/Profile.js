import React, { Component } from 'react';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Auth from './Auth/Auth';
import EditProfile from './EditProfile/EditProfile';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';

const fullScreenMinWidth = 550;

const profileStyle = {
    position: 'relative',
    fontSize: '0.8em',
    borderBottom: '1px solid grey'
}

const contentDivStyle = {
    textAlign: 'center',
    width: "270px",
    margin: "30px 0px"
}

const clearButtonStyle = {
    position: 'absolute',
    'right': '10px',
    'top': '10px'
};

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

        const { user } = this.props

        return (
            <div>
                {
                    user.isLoggedIn && <div style={profileStyle} onClick={this.handleClickOpen}>
                        Hi, {user.data.first_name || user.data.username}
                    </div>
                }
                {
                    !user.isLoggedIn && <div style={profileStyle} onClick={this.handleClickOpen}>
                        Log in or Signup
                    </div>
                }
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                >
                    <DialogTitle>
                        {user.isLoggedIn ?
                            this.props.translate('profile.dialog.title.loggedIn') + (user.data.first_name || user.data.username)
                            :
                            this.props.translate('profile.dialog.title.notLoggedIn')
                        }
                    </DialogTitle>
                    <DialogContent>
                        <div style={contentDivStyle}>
                            <Auth {...this.props} />
                            {this.props.user.isLoggedIn && <EditProfile {...this.props} />}
                        </div>
                    </DialogContent>

                    <IconButton onClick={this.handleRequestClose} style={clearButtonStyle}>
                        <ClearIcon />
                    </IconButton>
                </Dialog>
            </div>
        );
    }
}

export default withMobileDialog()(ProfileDialog);
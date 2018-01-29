import React, { Component } from 'react';
import Dialog, {
    DialogContent,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Auth from './Auth/Auth';
import EditProfile from './EditProfile/EditProfile';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import SignInIcon from 'react-icons/lib/fa/sign-in';
import UserIcon from 'react-icons/lib/fa/user';
import Divider from 'material-ui/Divider';


const fullScreenMinWidth = 550;

const profileStyle = {
    position: 'relative',
    fontSize: '0.8em',
    cursor: 'pointer'
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
                    user.isLoggedIn && <Button style={profileStyle} onClick={this.handleClickOpen}>
                        Hi, {user.data.first_name || user.data.username} &nbsp; <UserIcon />
                    </Button>
                }
                {
                    !user.isLoggedIn &&
                    <Button onClick={this.handleClickOpen} style={profileStyle}>
                        Log in or Signup &nbsp; <SignInIcon />
                    </Button>
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
                            {this.props.user.isLoggedIn && <EditProfile {...this.props} />}
                            <Divider style={{margin: '8px 0px'}}/>
                            <Auth {...this.props} />
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
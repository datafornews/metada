import React, { Component } from 'react';
import EditProfileForm from './EditProfileForm';
import Dialog, {
    DialogContent,
    DialogTitle,
    DialogActions,
    withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import ClearIcon from 'material-ui-icons/Clear';
import Typography from 'material-ui/Typography';

const fullScreenMinWidth = 650;

const dialogContentStyle = {
    textAlign: 'center'
};

class EditProfile extends Component {

    state = {
        pending: false,
        open: false,
        submitError: ''
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };


    handleRequestClose = () => {
        this.props.rrfReset('editProfileForm.user.password');
        this.props.rrfReset('editProfileForm.user.oldPassword');
        this.props.rrfReset('editProfileForm.user.confirmPassword');
        this.setState({ open: false });
    };

    makePending = () => {
        this.setState(
            {
                pending: true
            }
        )
    }

    makeNotPending = () => {
        this.setState(
            {
                pending: false
            }
        )
    }

    submitEditProfileForm = values => {
        const escaped = JSON.parse(JSON.stringify(values));
        console.log('EDIT', values);
        this.props.editUser(this, escaped);
    }

    render() {
        let { fullScreen } = this.props;
        if (this.props.clientType === 'extension' || window.innerWidth > fullScreenMinWidth) {
            fullScreen = false;
        }
        return (
            <div>
                <Button onClick={this.handleClickOpen} color="primary">{this.props.translate('home.profile.edit.button')}</Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <DialogTitle>{this.props.translate('home.profile.edit.title')}</DialogTitle>
                    <DialogContent component={'div'} style={dialogContentStyle}>
                        <Typography type="body1">
                            {this.props.translate('home.profile.edit.content')}
                        </Typography>
                        <br /><br />
                        <EditProfileForm
                            {...this.props}
                            onSubmit={this.submitEditProfileForm}
                            makePending={this.makePending}
                            makeNotPending={this.makeNotPending}
                            submitError={this.state.submitError}
                            pending={this.state.pending}
                        />
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={this.handleRequestClose}>
                            <ClearIcon />
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default withMobileDialog()(EditProfile);

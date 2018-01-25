import React, { Component } from 'react';
import EditProfileForm from './EditProfileForm';
import Dialog, {
    DialogContent,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

const fullScreenMinWidth = 650;

const dialogContentStyle = {
    textAlign: 'center'
};

const clearButtonStyle = {
    position: 'absolute',
    'right': '10px',
    'top': '10px'
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
        let { fullScreen, classes } = this.props;
        if (this.props.clientType === 'extension' || window.innerWidth > fullScreenMinWidth) {
            fullScreen = false;
        }
        return (
            <div>
                <Button onClick={this.handleClickOpen} color="primary">{this.props.translate('home.profile.edit.button')}</Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                >
                    <DialogTitle>{this.props.translate('home.profile.edit.title')}</DialogTitle>
                    <DialogContent component={'div'} style={dialogContentStyle}>
                        <Typography color="primary" type="body1">
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

                    <IconButton style={clearButtonStyle} onClick={this.handleRequestClose}>
                        <ClearIcon />
                    </IconButton>

                </Dialog>
            </div>
        )
    }
}

const EditDialog = withStyles()(EditProfile);

export default withMobileDialog()(EditDialog);

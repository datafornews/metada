import React, { Component } from 'react'
import LoginForm from './LoginForm';
import Dialog, {
    DialogContent,
    DialogTitle,
    DialogActions,
    withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import ClearIcon from 'material-ui-icons/Clear';

const fullScreenMinWidth = 650;


const dialogContentStyle = {
    textAlign: 'center',
    minWidth: 400,
    maxWidth: 800
};

const clearButtonStyle = {
    position: 'absolute',
    'right': '10px',
    'top': '10px'
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitError: '',
            open: false,
            pending: false
        }
    }

    showResults = values => {
        const escaped = JSON.parse(JSON.stringify(values));
        this.props.userLogin(this, escaped)
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
        this.props.rrfReset('loginForm.user.password');
    };

    makePending = () => {
        this.setState({
            pending: true
        })
    }

    makeNotPending = () => {
        this.setState({
            pending: false
        })
    }

    render() {
        let { fullScreen } = this.props;
        if (this.props.clientType === 'extension' || window.innerWidth > fullScreenMinWidth) {
            fullScreen = false;
        }

        return (
            <div style={{fontSize: '0.8rem'}}>
                {this.props.translate('profile.dialog.login')}
                <br/>
                <Button onClick={this.handleClickOpen} color="primary">
                    {this.props.translate('profile.login.button')}
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                >
                    <DialogTitle>{this.props.translate('profile.login.button')}</DialogTitle>
                    <DialogContent component={'div'} style={dialogContentStyle}>
                        <Typography type="body1">
                            {this.props.translate('profile.login.dialogContent')}
                        </Typography>
                        <br /><br />
                        <LoginForm
                            {...this.props}
                            onSubmit={this.showResults}
                            submitError={this.state.submitError}
                            pending={this.state.pending}
                            makePending={this.makePending}
                            makeNotPending={this.makeNotPending}
                        />
                    </DialogContent>

                        <IconButton onClick={this.handleRequestClose} style={clearButtonStyle}>
                            <ClearIcon />
                        </IconButton>

                </Dialog>
            </div>
        )
    }
}


export default withMobileDialog()(Login);
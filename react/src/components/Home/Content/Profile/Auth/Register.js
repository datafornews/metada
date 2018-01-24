import React, { Component } from 'react'
import RegisterForm from './RegisterForm';
import Axios from 'axios';
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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitError: '',
            open: false,
            pending: false
        }
    }

    setRandomUsername = () => {
        Axios.get(
            'http://localhost:5000/public/random_username').then(
            (res) => {
                if (res.data) {
                    this.props.rrfChange('signupForm.user.username', res.data.username);
                }
            },
            (err) => {
                console.log(err)
            }
            ).catch((e) => {
                console.log(e)
            });
    }

    submitRegisterForm = values => {
        const escaped = JSON.parse(JSON.stringify(values));
        this.props.registerUser(this, escaped);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
        this.props.rrfReset('signupForm.user');
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
            <div>
                <Button onClick={this.handleClickOpen} color="primary">{this.props.translate('home.profile.register')}</Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                >
                    <DialogTitle>{this.props.translate('home.profile.registerTitle')}</DialogTitle>
                    <DialogContent component={'div'} style={dialogContentStyle}>
                        <Typography type="body1">
                            {this.props.translate('home.profile.registerContent')}
                        </Typography>
                        <br /><br />
                        <RegisterForm
                            {...this.props}
                            onSubmit={this.submitRegisterForm}
                            submitError={this.state.submitError}
                            setRandomUsername={this.setRandomUsername} 
                            pending={this.state.pending}
                            makePending={this.makePending}
                            makeNotPending={this.makeNotPending}
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


 export default withMobileDialog()(Register);
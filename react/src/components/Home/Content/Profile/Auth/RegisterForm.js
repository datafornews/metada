import React from 'react';
import { Control, Form } from 'react-redux-form';
import Axios from 'axios';
import TextInput from '../../../../Utils/TextInput';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { InputAdornment } from 'material-ui/Input';
import Shuffle from 'react-icons/lib/ti/arrow-shuffle';
import { CircularProgress } from 'material-ui/Progress';
import { isEmail, checkPass } from '../../../../../utils/formValidators';


const buttonDivStyle = {
    textAlign: 'right'
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordsMatch: true,
            usernameIsAvailable: true,
            emailIsAvailable: true,
        }
    }

    formErrors = form => {
        if (!this.state.usernameIsAvailable) {
            return this.props.translate('home.profile.errors.usernameExists');
        }
        if (!isEmail(form.user.email.value) && form.user.email.value.length !== 0) {
            return this.props.translate('home.profile.errors.invalidEmail');
        }
        if (!this.state.emailIsAvailable) {
            return this.props.translate('home.profile.errors.emailExists');
        }
        if (!checkPass(form.user.password.value) && form.user.password.value.length !== 0) {
            return this.props.translate('home.profile.errors.passwordTooShort');
        }
        if (!this.state.passwordsMatch) {
            return this.props.translate('home.profile.errors.passwordsDontMatch');
        }
        return ''

    }

    componentDidMount() {
        this.props.setRandomUsername();
    }

    passwordsMatch = (vals) => {
        if (this.state.passwordsMatch !== (vals.password === vals.confirmPassword)) {
            this.setState(
                { passwordsMatch: vals.password === vals.confirmPassword }
            );
        }
        return vals.password === vals.confirmPassword && vals.password.length && vals.confirmPassword.length
    }


    asyncCheckUsername = (username) => {
        return Axios.get('http://localhost:5000/public/exists/username?username=' + username)
    }

    usernameAsyncValidator = (val, done) => this.asyncCheckUsername(val)
        .then(res => {
            const usernameIsAvailable = !res.data.exists;
            if (this.state.usernameIsAvailable !== usernameIsAvailable) {
                this.setState({
                    usernameIsAvailable
                })
            }
            done(usernameIsAvailable);
        })

    asyncCheckEmail = (email) => {
        return Axios.get('http://localhost:5000/public/exists/email?email=' + email)
    }

    emailAsyncValidator = (val, done) => this.asyncCheckEmail(val)
        .then(res => {
            const emailIsAvailable = !res.data.exists;
            if (this.state.emailIsAvailable !== emailIsAvailable) {
                this.setState({
                    emailIsAvailable
                })
            }
            done(emailIsAvailable);
        })

    handleSubmit = (user) => {
        // Do whatever you like in here.
        // If you connect the RegisterForm to the Redux store,
        // you can dispatch actions such as:
        // dispatch(actions.submit('user', somePromise));
        // etc.
        this.props.makePending()
        this.props.onSubmit(user)
    }


    handleChange = (model) => {
        this.props.makeNotPending()
        // console.log('Form is valid:', this.props.signupForm.forms.$form.valid)
    }


    render() {

        const form = this.props.signupForm.forms;

        return (
            <Form
                model="signupForm.user"
                onSubmit={(user) => {
                    this.handleSubmit(user)
                }}
                onChange={this.handleChange}
                validateOn='change'
                validators={{
                    '': {
                        passwordsMatch: this.passwordsMatch,
                    },
                }}
            >

                <Control.text
                    model=".username"
                    asyncValidators={{
                        available: this.usernameAsyncValidator
                    }}
                    asyncValidateOn="blur"
                    component={TextInput}
                    controlProps={{
                        model: this.props.signupForm.user,
                        label: this.props.translate('login.username.label'),
                        id: 'username',
                        valid: this.state.usernameIsAvailable,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={this.props.setRandomUsername}
                                >
                                    <Shuffle />
                                </IconButton>
                            </InputAdornment>)
                    }}
                /><br /><br />


                <Control.text
                    model=".email"
                    validators={{
                        required: (val) => val && val.length,
                        isEmail
                    }}
                    validateOn="change"
                    asyncValidators={{
                        available: this.emailAsyncValidator
                    }}
                    asyncValidateOn="blur"
                    component={TextInput}
                    controlProps={{
                        model: this.props.signupForm.user,
                        label: this.props.translate('login.email.label'),
                        id: 'email',
                        valid: this.state.emailIsAvailable && form.user.email.valid
                    }}
                /><br /><br />

                <Control.text
                    validators={{
                        required: (val) => val && val.length,
                        checkPass
                    }}
                    validateOn='change'
                    type="password"
                    model=".password"
                    component={TextInput}
                    controlProps={{
                        model: this.props.signupForm.user,
                        label: this.props.translate('login.password.label'),
                        id: 'password',
                        type: "password",
                        valid: this.state.passwordsMatch && form.user.password.valid
                    }}
                /><br /><br />

                <Control.text
                    validators={{
                        required: (val) => val && val.length,
                        checkPass
                    }}
                    validateOn='change'
                    type="password"
                    model=".confirmPassword"
                    component={TextInput}
                    controlProps={{
                        model: this.props.signupForm.user,
                        label: this.props.translate('login.confirmPassword.label'),
                        id: 'confirmPassword',
                        type: "password",
                        valid: this.state.passwordsMatch && form.user.password.valid
                    }}
                /><br /><br />

                <div style={buttonDivStyle}>
                    {this.props.pending ?
                        <CircularProgress />
                        :
                        (<Button type="submit" color="primary" disabled={!form.$form.valid}>
                            {this.props.translate('login.form.submit')}
                        </Button>)
                    }
                </div>


                <div style={{ width: '300px', color: 'red', margin: 'auto' }}>
                    {this.formErrors(form)}
                    {/* {this.props.submitError && this.props.translate('home.profile.registerErrors.submit.' + this.props.submitError)} */}
                </div>

            </Form>
        );
    }
}

export default RegisterForm;
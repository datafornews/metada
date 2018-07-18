import React from 'react';
import { Control, Form } from 'react-redux-form';
import validator from 'validator';
import Axios from 'axios';
import TextInput from './TextInput';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {InputAdornment } from '@material-ui/core/Input';
import Shuffle from 'react-icons/lib/ti/arrow-shuffle';

const isEmail = (val) => {
    return val && validator.isEmail(val);
}

const checkPass = val => {
    return val && val.length > 5;
}


const buttonDivStyle = {
    textAlign: 'right'
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordsMatch: true,
            usernameIsAvailable: true,
            emailIsAvailable: true
        }
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
        return Axios.get('http://localhost:5000/user_exists/' + username)
    }

    usernameAsyncValidator = (val, done) => this.asyncCheckUsername(val)
        .then(res => {
            console.log('Username exists: ', res.data.exists);
            const usernameIsAvailable = !res.data.exists;
            if (this.state.usernameIsAvailable !== usernameIsAvailable) {
                this.setState({
                    usernameIsAvailable
                })
            }
            done(usernameIsAvailable);
        })

    asyncCheckEmail = (email) => {
        return Axios.get('http://localhost:5000/email_exists/' + email)
    }

    emailAsyncValidator = (val, done) => this.asyncCheckEmail(val)
        .then(res => {
            console.log('Email exists: ', res.data.exists);
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
        this.props.onSubmit(user)
    }

    handleChange = (model) => {
        console.log('Form is valid:', this.props.userSignupForm.forms.$form.valid)
    }

    render() {

        const form = this.props.userSignupForm.forms;

        return (
            <Form
                model="userSignupForm.user"
                onSubmit={(user) => {
                    console.log(user);
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
                        model: this.props.userSignupForm.user,
                        label: this.props.translate('login.username.label'),
                        id: 'username',
                        valid: this.state.usernameIsAvailable,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={this.setRandomUsername}
                                >
                                    <Shuffle />}
                                </IconButton>
                            </InputAdornment>)
                    }}
                /><br /><br />


                {/* <Control.text
                    model=".firstName"
                    component={TextInput}
                    controlProps={{
                        model: this.props.userSignupForm.user,
                        label: this.props.translate('login.firstName.label'),
                        id: 'firstName'
                    }}
                /><br /><br />


                <label htmlFor=".lastName"></label>
                <Control.text
                    model=".lastName"
                    component={TextInput}
                    controlProps={{
                        model: this.props.userSignupForm.user,
                        label: this.props.translate('login.lastName.label'),
                        id: 'lastName'
                    }}
                /><br /><br /> */}


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
                        model: this.props.userSignupForm.user,
                        label: this.props.translate('login.email.label'),
                        id: 'email',
                        valid: this.state.emailIsAvailable
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
                        model: this.props.userSignupForm.user,
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
                        model: this.props.userSignupForm.user,
                        label: this.props.translate('login.confirmPassword.label'),
                        id: 'confirmPassword',
                        type: "password",
                        valid: this.state.passwordsMatch && form.user.password.valid
                    }}
                /><br /><br />

                <div style={buttonDivStyle}>
                    <Button type="submit" color="primary" disabled={!form.$form.valid}>
                        {this.props.translate('login.form.submit')}
                    </Button><br /><br />
                </div>

                {this.props.submitError}
            </Form>
        );
    }
}

export default RegisterForm;
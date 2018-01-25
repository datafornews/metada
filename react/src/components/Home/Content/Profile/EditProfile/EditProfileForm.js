import React from 'react';
import { Control, Form } from 'react-redux-form';
import Axios from 'axios';
import TextInput from '../../../../Utils/TextInput';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';
import { isEmail, checkPass } from "../../../../../utils/formValidators";
import Grid from 'material-ui/Grid';

const buttonDivStyle = {
    textAlign: 'right'
}

const newPassCheck = (val) => {
    return val ? checkPass(val) : true
}

class EditProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordsMatch: true,
            usernameIsAvailable: true,
            emailIsAvailable: true,
        }
    }

    componentWillMount() {
        this.props.rrfChange('editProfileForm.user.email', this.props.user.data.email);
        this.props.rrfChange('editProfileForm.user.first_name', this.props.user.data.first_name || '');
        this.props.rrfChange('editProfileForm.user.last_name', this.props.user.data.last_name || '');
        this.props.rrfChange('editProfileForm.user.username', this.props.user.data.username);

    }


    formErrors = form => {
        if (!this.state.usernameIsAvailable) {
            return this.props.translate('errors.usernameExists');
        }
        if (!(form.user.username.value && form.user.username.value.length >= 3 && form.user.username.value.length <= 25)) {
            return this.props.translate('errors.invalidUsernameLength');
        }
        if (!isEmail(form.user.email.value) && form.user.email.value.length !== 0) {
            return this.props.translate('errors.invalidEmail');
        }
        if (!this.state.emailIsAvailable) {
            return this.props.translate('errors.emailExists');
        }
        if (!checkPass(form.user.password.value) && form.user.password.value.length !== 0) {
            return this.props.translate('errors.passwordTooShort');
        }
        if (!this.state.passwordsMatch) {
            return this.props.translate('errors.passwordsDontMatch');
        }
        return ''

    }

    handleClick = () => {
        this.props.makePending();
        this.props.rrfSubmit('editProfileForm.user')
    }

    passwordsMatch = (vals) => {

        if (this.state.passwordsMatch !== (vals.password === vals.confirmPassword)) {
            this.setState(
                { passwordsMatch: vals.password === vals.confirmPassword }
            );
        }
        const exist = vals.password && vals.confirmPassword;
        if (!exist) {
            return true;
        }
        const empty = vals.password.length && vals.confirmPassword.length
        if (empty) {
            return true;
        }
        const same = vals.password === vals.confirmPassword;

        return same
    }


    asyncCheckUsername = (username) => {
        return Axios.get('http://localhost:5000/public/exists/username?username=' + username, {
            headers: {
                Authorization: 'Bearer: ' + localStorage['_jwt']
            }
        })
    }

    usernameAsyncValidator = (val, done) => this.asyncCheckUsername(val)
        .then(res => {
            console.log(res.data)
            if (!this.state.usernameIsAvailable) {
                this.setState({
                    usernameIsAvailable: true
                })
            }
            done(true);
        },
        err => {
            if (this.state.usernameIsAvailable) {
                this.setState({
                    usernameIsAvailable: false
                })
            }
            console.log('Username Error: ', err.response)
            done(false);
        })

    asyncCheckEmail = (email) => {
        return Axios.get('http://localhost:5000/public/exists/email?email=' + email, {
            headers: {
                Authorization: 'Bearer ' + localStorage['_jwt']
            }
        })
    }

    emailAsyncValidator = (val, done) => {
        this.asyncCheckEmail(val)
            .then(res => {
                if (res.data){
                    this.setState({
                        emailIsAvailable: res.data.exists ? val === this.props.user.data.email : true
                    })
                } 
                done(true);
            },
            err => {
                if (this.state.emailIsAvailable) {
                    this.setState({
                        emailIsAvailable: false
                    })
                }
                console.log('Email Error: ', err.response.data.message)
                done(false);
            })
    }

    handleSubmit = (user) => {
        // Do whatever you like in here.
        // If you connect the RegisterForm to the Redux store,
        // you can dispatch actions such as:
        // dispatch(actions.submit('user', somePromise));
        // etc.
        this.props.onSubmit(user)
    }


    handleChange = (model) => {
        this.props.makeNotPending()
        // console.log('Form is valid:', this.props.editProfileForm.forms.$form.valid)
    }


    render() {

        const form = this.props.editProfileForm.forms;

        return (
            <Form
                model="editProfileForm.user"
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
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={6}>
                        <Control.text
                            model=".username"
                            validators={{
                                minThree: (val) => {
                                    return val && val.length > 3
                                },
                                maxTwentyFive: (val) => {
                                    return val && val.length < 25
                                }
                            }}
                            asyncValidators={{
                                available: this.usernameAsyncValidator
                            }}
                            asyncValidateOn="blur"
                            validateOn="change"
                            component={TextInput}
                            controlProps={{
                                model: this.props.editProfileForm.user,
                                label: this.props.translate('login.username.label'),
                                id: 'username',
                                valid: this.state.usernameIsAvailable && form.user.username.valid
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                                model: this.props.editProfileForm.user,
                                label: this.props.translate('login.email.label'),
                                id: 'email',
                                valid: this.state.emailIsAvailable && form.user.email.valid
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Control.text
                            model=".first_name"
                            component={TextInput}
                            controlProps={{
                                model: this.props.editProfileForm.user,
                                label: this.props.translate('login.first_name.label'),
                                id: 'first_name'
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Control.text
                            model=".last_name"
                            component={TextInput}
                            controlProps={{
                                model: this.props.editProfileForm.user,
                                label: this.props.translate('login.last_name.label'),
                                id: 'last_name',
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Control.text
                            validators={{
                                newPassCheck
                            }}
                            validateOn='change'
                            type="password"
                            model=".password"
                            component={TextInput}
                            controlProps={{
                                model: this.props.editProfileForm.user,
                                label: this.props.translate('home.profile.edit.password'),
                                id: 'password',
                                type: "password",
                                valid: this.state.passwordsMatch && form.user.password.valid
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Control.text
                            validators={{
                                newPassCheck
                            }}
                            validateOn='change'
                            type="password"
                            model=".confirmPassword"
                            component={TextInput}
                            controlProps={{
                                model: this.props.editProfileForm.user,
                                label: this.props.translate('home.profile.edit.confirmPassword'),
                                id: 'confirmPassword',
                                type: "password",
                                valid: this.state.passwordsMatch && form.user.password.valid
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Control.text
                            validators={{
                                required: (val) => val && val.length,
                            }}
                            validateOn='change'
                            type="password"
                            model=".oldPassword"
                            component={TextInput}
                            controlProps={{
                                model: this.props.editProfileForm.user,
                                label: this.props.translate('home.profile.edit.oldPassword'),
                                id: 'oldPassword',
                                type: "password",
                                valid: form.user.oldPassword && form.user.oldPassword.valid
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <div style={buttonDivStyle}>
                            {this.props.pending ?
                                <CircularProgress />
                                :
                                (<Button
                                    type="submit"
                                    color="primary"
                                    disabled={!form.$form.valid || this.props.pending || !this.state.passwordsMatch}
                                    onClick={this.handleClick}>
                                    {this.props.translate('login.form.submit')}
                                </Button>)
                            }
                        </div>
                        <div style={{ width: '300px', color: 'red', margin: 'auto' }}>
                            {this.formErrors(form)}
                            {this.props.submitError}
                        </div>
                    </Grid>
                </Grid>
            </Form>
        );
    }
}

export default EditProfileForm;
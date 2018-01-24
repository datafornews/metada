import React from 'react';
import { Control, Form } from 'react-redux-form';
import TextInput from '../../../../Utils/TextInput';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { isEmail, checkPass } from "../../../../../utils/formValidators";
import Grid from 'material-ui/Grid';



const buttonDivStyle = {
    textAlign: 'right'
}

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submitError: this.props.submitError || ''
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.submitError !== this.state.submitError) {
            this.setState({
                submitError: nextProps.submitError
            })
        }
    }


    handleSubmit = (user) => {
        // Do whatever you like in here.
        // If you connect the RegisterForm to the Redux store,
        // you can dispatch actions such as:
        // dispatch(actions.submit('user', somePromise));
        // etc.
        this.props.makePending();
        this.props.onSubmit(user)
    }

    handleChange = (model) => {
        if (this.props.pending) {
            this.props.makeNotPending();
        }
        this.setState({
            submitError: ''
        })
    }

    render() {

        const form = this.props.loginForm.forms;
        return (
            <Form
                model="loginForm.user"
                onSubmit={(user) => {
                    console.log(user);
                    this.handleSubmit(user)
                }}
                onChange={this.handleChange}
            >

                <Grid container spacing={16}>
                    <Grid item xs={12} md={6}>
                        <Control.text
                            model=".email"
                            validators={{
                                required: (val) => val && val.length,
                                isEmail
                            }}
                            validateOn="change"
                            component={TextInput}
                            controlProps={{
                                model: this.props.loginForm.user,
                                label: this.props.translate('login.email.label'),
                                id: 'email',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                                model: this.props.loginForm.user,
                                label: this.props.translate('login.password.label'),
                                id: 'password',
                                type: "password",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={buttonDivStyle}>
                            {this.props.pending ?
                                <CircularProgress />
                                :
                                (<Button type="submit" color="primary" disabled={!form.$form.valid}>
                                    {this.props.translate('login.form.submit')}
                                </Button>)
                            }
                        </div>

                        {this.state.submitError && this.props.translate('errors.' + this.state.submitError)}
                    </Grid>
                </Grid>
            </Form>
        );
    }
}

export default RegisterForm;
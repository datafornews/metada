import React, { Component } from 'react'
import RegisterForm from './RegisterForm';
import Axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitError: ''
        }
    }


    showResults = values => {
        const escaped = JSON.parse(JSON.stringify(values));
        Axios.post("http://localhost:5000/auth/register", escaped).then(
            (resp) => {
                console.log(resp);
                if (resp.data) {
                    if (resp.data.status === 'success' && resp.data.auth_token) {
                        localStorage.setItem('_jwt', resp.data.auth_token);
                        this.setState(
                            { submitError: '' }
                        );
                        this.props.close();
                    }
                }
            },
            (err) => {
                if (err.response.status === 401) {
                    this.setState(
                        { submitError: err.response.data.message }
                    );
                }
            }
        )
    }
    render() {
        return (
            <div>
                <RegisterForm
                    {...this.props}
                    onSubmit={this.showResults}
                    submitError={this.state.submitError}
                    setRandomUsername={this.props.setRandomUsername} />
            </div>
        )
    }
}
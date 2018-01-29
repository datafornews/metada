/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Register from './Register'
import ResendEmail from './ResendEmail';
import Logout from './Logout';
import Login from './Login';
import Divider from 'material-ui/Divider';


export default class Auth extends React.Component {

    render() {
        return (
            <div>
                {!this.props.user.isLoggedIn && <Register {...this.props} />}
                {!this.props.user.isLoggedIn && <Divider />}
                {!this.props.user.isLoggedIn && <div><br /><Login {...this.props} /></div>}
                {this.props.user.isLoggedIn && !this.props.user.isConfirmed && <div><br /><br /><ResendEmail {...this.props} /></div>}
                {this.props.user.isLoggedIn && <Logout {...this.props} />}
            </div>
        );
    }
}
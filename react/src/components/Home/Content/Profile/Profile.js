import React, { Component } from 'react';
import ProfileDialog from './ProfileDialog';
import Auth from './Auth/Auth';

class Profile extends Component {
    render() {

        return <ProfileDialog {...this.props} />


    }
}

export default Profile;
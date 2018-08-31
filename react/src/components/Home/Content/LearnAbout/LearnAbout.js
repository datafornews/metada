import React, { Component } from 'react';
import Intent from './Intent';

class LearnAbout extends Component {
    render() {

        return this.props.location.pathname.indexOf('/about') > -1
            ?
            <Intent {...this.props} />
            :   
            ''

    }
}

export default LearnAbout;
import React, { Component } from 'react';
import Intent from './Intent';

class LearnAbout extends Component {
    render() {

        return this.props.show.about
            ?
            <Intent {...this.props} />
            :
            ''

    }
}

export default LearnAbout;
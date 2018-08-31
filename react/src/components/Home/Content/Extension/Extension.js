import React, { Component } from 'react';
import ExtensionPaper from './ExtensionPaper';

class Extension extends Component {
    render() {

        return this.props.location.pathname.indexOf('/extension') > -1
            ?
            <ExtensionPaper {...this.props} />
            :
            ''

    }
}

export default Extension;
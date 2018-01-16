import React, { Component } from 'react';
import ExtensionPaper from './ExtensionPaper';

class Extension extends Component {
    render() {

        return this.props.show.extension
            ?
            <ExtensionPaper {...this.props} />
            :
            ''

    }
}

export default Extension;
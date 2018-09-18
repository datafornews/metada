import React, { Component } from 'react';
import ContributePaper from './ContributePaper';

class Contribute extends Component {
    render() {

        return this.props.location.pathname.indexOf('/contribute') > -1
            ?
            <ContributePaper {...this.props} />
            :
            ''

    }
}

export default Contribute;
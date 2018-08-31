import React, { Component } from 'react';
import StatsPaper from './StatsPaper';

class Stats extends Component {

    render() {

        return this.props.location.pathname.indexOf('/stats') > -1 ?
            <StatsPaper {...this.props} />
            :
            ''

    }
}

export default Stats;
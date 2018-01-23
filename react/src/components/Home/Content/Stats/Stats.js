import React, { Component } from 'react';
import StatsPaper from './StatsPaper';

class Stats extends Component {
    
    render() {

        return this.props.show.stats
            ?
            <StatsPaper {...this.props} />
            :
            ''

    }
}

export default Stats;
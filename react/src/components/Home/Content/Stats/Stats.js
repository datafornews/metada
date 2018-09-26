import React, { Component } from 'react';
import StatsPaper from './StatsPaper';
import Home from '../../Home'
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class Stats extends Component {

    render() {

        return <Home isMain={false} {...this.props}>
        <StatsPaper {...this.props} />
    </Home>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
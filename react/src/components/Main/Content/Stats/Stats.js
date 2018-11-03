import React, { Component } from 'react';
import StatsPaper from './StatsPaper';
import Container from '../../../Container';
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class Stats extends Component {

    render() {

        return <Container isMain={false} {...this.props}>
        <StatsPaper {...this.props} />
    </Container>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
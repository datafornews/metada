import React, { Component } from 'react';
import SettingsPaper from './SettingsPaper';
import Container from '../../../Container';
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class Settings extends Component {
    render() {

        return <Container isMain={false} {...this.props}>
            <SettingsPaper {...this.props} />
        </Container>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
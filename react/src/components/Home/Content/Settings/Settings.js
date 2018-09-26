import React, { Component } from 'react';
import SettingsPaper from './SettingsPaper';
import Home from '../../Home'
import { connect } from 'react-redux';
import mapStateToProps from '../../../../store/defaultMapStateToProps';
import mapDispatchToProps from '../../../../store/defaultMapDispatchToProps';

class Settings extends Component {
    render() {

        return <Home isMain={false} {...this.props}>
            <SettingsPaper {...this.props} />
        </Home>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
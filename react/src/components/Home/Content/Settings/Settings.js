import React, { Component } from 'react';
import SettingsPaper from './SettingsPaper';

class Settings extends Component {
    render() {

        return this.props.location.pathname.indexOf('/settings') > -1
            ?
            <SettingsPaper {...this.props} />
            :
            ''

    }
}

export default Settings;
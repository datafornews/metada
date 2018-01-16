import React, { Component } from 'react';
import SettingsPaper from './SettingsPaper';

class Settings extends Component {
    render() {

        return this.props.show.settings
            ?
            <SettingsPaper {...this.props} />
            :
            ''

    }
}

export default Settings;
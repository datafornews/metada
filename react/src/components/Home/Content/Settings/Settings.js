import React, { Component } from 'react';
import SettingsPaper from './SettingsPaper';
import ContactPaper from './ContactPaper';

class Settings extends Component {
    render() {

        return this.props.show.settings
            ?
            <div>
                <SettingsPaper {...this.props} />
                <ContactPaper {...this.props} />

            </div>
            :
            ''

    }
}

export default Settings;
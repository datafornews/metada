import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import ResetApp from './ResetApp';
import ShowLegend from './ShowLegend';
import HomePaper from '../../Paper/HomePaper'

class SettingsPaper extends Component {

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <HomePaper
                    {...this.props}
                    toggle={this.props.toggleSettings}
                    content={
                        <div style={{textAlign:'center'}}>
                            <LanguageSelect {...this.props} />
                            <ShowLegend {...this.props} />
                            <ResetApp {...this.props} />
                        </div>
                    } />
            </div>
        );
    }
}

export default SettingsPaper;
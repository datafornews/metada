import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import ResetApp from './ResetApp';
import ShowLegend from './ShowLegend';
import ShowChips from './ShowChips';
import HomePaper from '../../Paper/HomePaper'
import Grid from 'material-ui/Grid';

// const leftTdStyle = {
//     width: '50%',
//     textAlign: 'left'
// }

// const rightTdStyle = {
//     ...leftTdStyle,
//     textAlign: 'right'
// }

class SettingsPaper extends Component {

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <HomePaper
                    {...this.props}
                    toggle={this.props.toggleSettings}
                    content={
                        <Grid container spacing={16}>
                            <Grid item xs={10} md={6}><ShowChips {...this.props} /></Grid>
                            <Grid item xs={10} md={6}><ShowLegend {...this.props} /></Grid>
                            <Grid item xs={10} md={6}><LanguageSelect {...this.props} /></Grid>
                            <Grid item xs={10} md={6} style={{ display: 'flex', alignItems: 'center' }}><ResetApp {...this.props} /></Grid>
                        </Grid>
                    } />
            </div>
        );
    }
}

export default SettingsPaper;
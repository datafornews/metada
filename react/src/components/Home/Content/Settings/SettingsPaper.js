import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import ResetApp from './ResetApp';
import ShowLegend from './ShowLegend';
import ShowChips from './ShowChips';
import HomePaper from '../../Paper/HomePaper'
import Grid from 'material-ui/Grid';

const gridStyle = { display: "flex", justifyContent: "center", alignItems: 'center', fontSize: '0.9rem' }

class SettingsPaper extends Component {

    render() {
        return (
            <HomePaper
                {...this.props}
                toggle={this.props.toggleSettings}
                content={
                    <Grid container spacing={16}>
                        <Grid item xs={12} sm={6} md={4} style={gridStyle}><ShowChips {...this.props} /></Grid>
                        <Grid item xs={12} sm={6} md={4} style={gridStyle}><LanguageSelect {...this.props} /></Grid>
                        <Grid item xs={12} sm={6} md={4} style={gridStyle}><ShowLegend {...this.props} /></Grid>
                        <Grid item xs={12} sm={6} md={4} style={gridStyle}><ResetApp {...this.props} /></Grid>
                    </Grid>
                } />
        );
    }
}

export default SettingsPaper;
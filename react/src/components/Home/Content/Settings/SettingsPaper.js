import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import ResetApp from './ResetApp';
import ShowLegend from './ShowLegend';
import HomePaper from '../../Paper/HomePaper'
import Stats from './Stats';
import Grid from 'material-ui/Grid';

const gridStyle = { display: "flex", justifyContent: "center", alignItems: 'center', fontSize: '0.9rem' }

class SettingsPaper extends Component {

    render() {
        return (
            <HomePaper
                {...this.props}
                toggle={this.props.toggleSettings}
                content={
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={6} md={4} style={gridStyle}><LanguageSelect {...this.props} /></Grid>
                        <Grid item xs={12} sm={6} md={4} style={gridStyle}><ShowLegend {...this.props} /></Grid>
                        <Grid item xs={12} sm={6} md={4} style={gridStyle}><ResetApp {...this.props} /></Grid>
                        <Grid item xs={12} style={gridStyle}></Grid>
                        {this.props.clientType === 'extension' && <Grid item xs={12} style={gridStyle}><Stats {...this.props} /></Grid>}

                    </Grid>
                } />
        );
    }
}

export default SettingsPaper;
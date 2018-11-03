import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import ResetApp from './ResetApp';
// import ShowLegend from './ShowLegend';
// import ShowChips from './ShowChips';
import HomePaper from '../../Paper/HomePaper'
import Grid from '@material-ui/core/Grid';

const gridStyle = { display: "flex", justifyContent: "center", alignItems: 'center', fontSize: '0.9rem', padding: '5px 20px' }

class SettingsPaper extends Component {

    render() {

        const gridItems = [
            <LanguageSelect {...this.props} />,
            <ResetApp {...this.props} />
        ];

        return (
            <HomePaper
                {...this.props}
                toggle={this.props.toggleSettings}
                content={
                    <div>
                        <h1>{this.props.translate('home.settingsButton')}</h1>
                        <br />
                        <br />
                        <Grid container spacing={40}>
                            {
                                gridItems.map(
                                    (gridItem, k) => {
                                        return (
                                            <Grid key={k} item xs={12} sm={6} style={gridStyle}>
                                                {gridItem}
                                            </Grid>
                                        );
                                    }
                                )
                            }
                        </Grid>
                    </div>
                } />
        );
    }
}

export default SettingsPaper;
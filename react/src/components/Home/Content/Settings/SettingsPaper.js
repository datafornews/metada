import React, { Component } from 'react';
import LanguageSelect from './LanguageSelect';
import ResetApp from './ResetApp';
import ShowLegend from './ShowLegend';
import ShowChips from './ShowChips';
import HomePaper from '../../Paper/HomePaper'
import Grid from '@material-ui/core/Grid';

const gridStyle = { display: "flex", justifyContent: "center", alignItems: 'center', fontSize: '0.9rem', padding: '5px 20px' }

class SettingsPaper extends Component {

    render() {

        const gridItems = this.props.clientType === 'mobile' ?
            [<LanguageSelect {...this.props} />,
            <ShowChips {...this.props} />,
            <ShowLegend {...this.props} />,
            <ResetApp {...this.props} />]
            :
            [<LanguageSelect {...this.props} />,
            <ShowChips {...this.props} />,
            <ResetApp {...this.props} />,
            <ShowLegend {...this.props} />];

        return (
            <HomePaper
                {...this.props}
                toggle={this.props.toggleSettings}
                content={
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
                } />
        );
    }
}

export default SettingsPaper;
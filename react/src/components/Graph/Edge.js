import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

import { colors } from '../../theme/metadaTheme';


export default class Edge extends Component {
    render() {
        const target = this.props.data.entities.ids[parseInt(this.props.infoBox.data.target, 10)]
        const source = this.props.data.entities.ids[parseInt(this.props.infoBox.data.source, 10)]

        if (!target || !source) {
            return ''
        }
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 62,
                marginTop: this.props.clientType === 'mobile' ? 56 : 8
            }}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={16}
                >
                    <Grid item xs={"auto"} md={3} style={{ padding: 0 }}></Grid>
                    <Grid item xs={4} md={2} style={{ textAlign: 'center', color: colors[source.category] }}>{source.name}</Grid>
                    <Grid item xs={4} md={2} style={{ textAlign: 'center', color: 'grey' }}>---<span style={{ fontSize: "0.7rem" }}>({this.props.infoBox.data.label})</span>--></Grid>
                    <Grid item xs={4} md={2} style={{ textAlign: 'center', color: colors[target.category] }}>{target.name}</Grid>
                    <Grid item xs={"auto"} md={3} style={{ padding: 0 }}></Grid>
                </Grid>
            </div>
            //     <div>
            //         {source.name} &nbsp;--<span style={{ fontSize: "0.7rem" }}>({this.props.infoBox.data.label})</span>--> &nbsp;{target.name}
            //     </div>
        )
    }
}

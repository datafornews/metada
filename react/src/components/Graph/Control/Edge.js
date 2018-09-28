import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { colors } from '../../../theme/metadaTheme';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => (
    {
        container: {
            display: 'flex',
            position: 'relative'
        },
    }
);

class Edge extends Component {
    render() {

        const { data, infoBox, clientType } = this.props;

        const target = data.entities.ids[parseInt(infoBox.share.target, 10)]
        const source = data.entities.ids[parseInt(infoBox.share.source, 10)]

        if (!target || !source) {
            return ''
        }
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 62,
                marginTop: clientType === 'mobile' ? 56 : 8
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
                    <Grid item xs={4} md={2} style={{ textAlign: 'center', color: 'grey' }}>---<span style={{ fontSize: "0.7rem" }}>({infoBox.share.label})</span>--></Grid>
                    <Grid item xs={4} md={2} style={{ textAlign: 'center', color: colors[target.category] }}>{target.name}</Grid>
                    <Grid item xs={"auto"} md={3} style={{ padding: 0 }}></Grid>
                </Grid>
            </div>
        )
    }
}

Edge.propTypes = {
    classes: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    infoBox: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};


export default withStyles(styles)(Edge);
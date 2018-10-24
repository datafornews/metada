import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { colors } from '../../../theme/metadaTheme';
import { withStyles } from '@material-ui/core/styles';
import ShareComment from './ShareComment';
import ShareSources from './ShareSources';

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
        const share = infoBox.share;
        const target = data.entities.ids[parseInt(share.target, 10)]
        const source = data.entities.ids[parseInt(share.source, 10)]

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
                    justify="space-around"
                    alignItems="center"
                    spacing={16}
                >
                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={4} md={2} style={{ textAlign: 'center', color: colors[source.category] }}>{source.name}</Grid>
                            <Grid item xs={4} md={2} style={{ textAlign: 'center', color: 'grey' }}>---<span style={{ fontSize: "0.7rem" }}>({share.label})</span>--></Grid>
                            <Grid item xs={4} md={2} style={{ textAlign: 'center', color: colors[target.category] }}>{target.name}</Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={"auto"}>
                        <Grid container >
                            {share.comment && <ShareComment share={share} />}
                            {share.sources.length !== 0 && <ShareSources share={share} />}
                        </Grid>
                    </Grid>
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
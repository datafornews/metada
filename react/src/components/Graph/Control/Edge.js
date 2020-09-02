import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { colors } from '../../../theme/metadaTheme';
import { withStyles } from '@material-ui/core/styles';
// import ShareComment from './ShareComment';
// import ShareSources from './ShareSources';

const styles = theme => (
{
        container: {
            display: 'flex',
            position: 'relative'
        },
        edgeLabel: {
            fontSize: '1.2rem',
            textAlign: 'center'
        },
        edgeValue: {
            color: 'grey',
            textAlign: 'center'
        }
    }
);

class Edge extends Component {
    render() {

        const { data, infoBox, classes } = this.props;
        const share = infoBox.share;
        const target = data.entities.ids[parseInt(share.target, 10)]
        const source = data.entities.ids[parseInt(share.source, 10)]

        if (!target || !source) {
            return ''
        }
        return (
            // <div style={{
            //     display: 'flex',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     minHeight: 62,
            //     marginTop: clientType === 'mobile' ? 56 : 8
            // }}>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item xs={4} md={2} className={classes.edgeLabel} style={{ color: colors[source.category] }}>{source.name}</Grid>
                            <Grid item xs={4} md={2} className={classes.edgeValue} >---&nbsp;{share.label}&nbsp;--></Grid>
                            <Grid item xs={4} md={2} className={classes.edgeLabel} style={{ color: colors[target.category] }}>{target.name}</Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={"auto"}>
                        <Grid container >
                            {share.comment && <ShareComment share={share} />}
                            {share.sources.length !== 0 && <ShareSources share={share} />}
                        </Grid>
                    </Grid> */}
                </Grid>
            // </div>
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
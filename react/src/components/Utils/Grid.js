import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
        width: '100%'
    },
    gridList: {
        width: 500,
        height: 450,
    },
    subheader: {
        width: '100%',
    },
});


function ImageGridList(props) {
    const { classes, data, spacing } = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={spacing}>
                {data.map((tile, k) => {
                    switch (tile.size) {
                        case 'xs':
                            return <Grid key={k} item xs={tile.cols}>
                                {tile.content}
                            </Grid>
                            break;
                        case 'sm':
                            return <Grid key={k} item sm={tile.cols}>
                                {tile.content}
                            </Grid>
                            break;
                        case 'md':
                            return <Grid key={k} item md={tile.cols}>
                                {tile.content}
                            </Grid>
                            break;
                        case 'lg':
                            return <Grid key={k} item lg={tile.cols}>
                                {tile.content}
                            </Grid>
                            break;
                        case 'xl':
                            return <Grid key={k} item xl={tile.cols}>
                                {tile.content}
                            </Grid>
                            break;
                        default:
                            return <Grid key={k} item md={tile.cols}>
                                {tile.content}
                            </Grid>
                            break;
                    }

                })}
            </Grid>
        </div>
    );
}

ImageGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);
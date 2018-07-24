import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import HelpCard from './HelpCard';
import LegendCard from './LegendCard';

const styles = theme => ({
    divContainer: {
        position: "absolute",
        top: theme.spacing.unit * 3 * 4,
        right: theme.spacing.unit * 3
    },
    toolbar: theme.mixins.toolbar
});

class SideCards extends Component {
    render() {
        const { classes, ...noClassProps } = this.props;
        return (
            <div  className={classes.divContainer}>
                <HelpCard {...noClassProps} />
                <div className={classes.toolbar}></div>
                <LegendCard {...noClassProps} />
            </div>
        )
    }
}

export default withStyles(styles)(SideCards);
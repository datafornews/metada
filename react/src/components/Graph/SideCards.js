import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import HelpCard from './HelpCard';

const styles = theme => ({
    divContainer: {
        position: "absolute",
        top: theme.spacing.unit * 3 * 5,
        right: 32,
        pointerEvents: "none",
        maxWidth: "70%"
    },
    toolbar: theme.mixins.toolbar
});

class SideCards extends Component {
    render() {
        const { classes, ...noClassProps } = this.props;
        return (
            <div  className={classes.divContainer}>
                <HelpCard {...noClassProps} />
            </div>
        )
    }
}

export default withStyles(styles)(SideCards);
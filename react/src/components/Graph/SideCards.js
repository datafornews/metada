import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import HelpCard from './HelpCard';
import zIndex from '@material-ui/core/styles/zIndex';

const styles = theme => ({
    divContainer: {
        position: "absolute",
        top: theme.spacing.unit * 3 * 3,
        right: 32,
        pointerEvents: "none",
        maxWidth: "70%",
        zIndex:200
    },
    mobileDivContainer:{
        position: "absolute",
        top: theme.spacing.unit * 3 * 5,
        left: "50%",
        transform: "translate(-50%)",
        width: "85%",
        zIndex:200
    },
    toolbar: theme.mixins.toolbar
});

class SideCards extends Component {
    render() {
        const { classes, ...noClassProps } = this.props;
        return (
            <div className={this.props.clientType === "mobile" ? classes.mobileDivContainer : classes.divContainer}>
                <HelpCard {...noClassProps} />
            </div>
        )
    }
}

export default withStyles(styles)(SideCards);
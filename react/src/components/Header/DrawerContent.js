import React, { Component } from 'react'

import Info from '../Graph/InfoBox/Info';

// import DrawerBottom from './DrawerBottom';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => (
    {
        container: {
            height: "100%",
            position: "relative"
        },
        toolbar: theme.mixins.toolbar
    }
);

class DrawerContent extends Component {

    state = {
        open: true
    }

    render() {

        const { classes, ...noClassProps } = this.props;

        return (
                <div className={classes.container}>
                    <Info {...noClassProps} />
                </div>
        )
    }
}

export default withStyles(styles)(DrawerContent);

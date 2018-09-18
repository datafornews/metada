import React, { Component } from 'react'

import Info from '../Graph/InfoBox/Info';

// import DrawerBottom from './DrawerBottom';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => (
    {
        toolbar: theme.mixins.toolbar,
        container: {
            position: "relative",
            height: "100%"
        }
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

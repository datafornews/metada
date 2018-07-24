import React, { Component } from 'react'

import InfoBoxEntityUI from '../Graph/InfoBox/InfoBoxEntityUI';

import Issue from '../Graph/InfoBox/Issue'

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
                    <div className={classes.toolbar} />

                    <InfoBoxEntityUI {...noClassProps} />
                    <Issue {...noClassProps} />
                </div>
        )
    }
}

export default withStyles(styles)(DrawerContent);

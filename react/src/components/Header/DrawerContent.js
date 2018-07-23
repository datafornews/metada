import React, { Component } from 'react'

import InfoBoxEntityUI from '../Graph/InfoBox/InfoBoxEntityUI';

import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => (
    {
        toolbar: theme.mixins.toolbar,
        container: {
            position: "relative"
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

                    <InfoBoxEntityUI {...this.props} />
                </div>
        )
    }
}

export default withStyles(styles)(DrawerContent);

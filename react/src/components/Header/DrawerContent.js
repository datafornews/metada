import React, { Component } from 'react'

import InfoBoxEntityUI from '../Graph/InfoBox/InfoBoxEntityUI';

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
                    {/* <div className={classes.toolbar} /> */}

                    <InfoBoxEntityUI {...noClassProps} />
                    {/* <DrawerBottom 
                    translate={this.props.translate}
                    clientType={this.props.clientType}
                    startHelp={this.props.startHelp}
                    reRenderGraph={this.props.reRenderGraph}
                    show={this.props.show}
                    toggleIssue={this.props.toggleIssue}
                    /> */}
                </div>
        )
    }
}

export default withStyles(styles)(DrawerContent);

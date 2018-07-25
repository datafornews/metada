import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Issue from '../Graph/InfoBox/Issue'
import LegendDialog from '../Graph/InfoBox/LegendDialog';


const styles = theme => (
    {
        container: {
            position: "relative",
            height: "100%"
        }
    }
);

class DrawerBottom extends Component {


    openHelp = () => {
        this.props.startHelp()
        setTimeout(this.props.reRenderGraph, 300)
    }


    render() {

        const { classes } = this.props

        return (
            <div className={classes.container}>
                <LegendDialog translate={this.props.translate} />
                <Issue 
                translate={this.props.translate}
                clientType={this.props.clientType} />
                <Button onClick={this.openHelp}>
                    Help
                </Button>

            </div>
        )
    }
}

export default withStyles(styles)(DrawerBottom);

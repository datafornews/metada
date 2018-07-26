import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
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


    render() {

        const { classes } = this.props

        return (
            <div className={classes.container}>
                <LegendDialog translate={this.props.translate} />
            </div>
        )
    }
}

export default withStyles(styles)(DrawerBottom);

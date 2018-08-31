import React, { Component } from 'react'
import LogoIcon from "react-icons/lib/go/puzzle"
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        "&:hover": {
            'cursor': 'pointer',
        },
        backgroundColor: theme.palette.primary.main,
        display: 'inline-block',
        marginLeft: 32,
        textAlign: 'center'
    },
    primary: {
        color: theme.palette.secondary.main,
        textTransform: 'uppercase'
    }
});

class Logo extends Component {
    render() {
        const { classes } = this.props;
        const isMobile = this.props.clientType === 'mobile';
        const size = isMobile ? 10 : 30;
        const padding = isMobile ? 6 : 12;
        const width = isMobile ? 'inherit' : 180 - 2 * padding;
        const marginLeft = isMobile ? 4 : 8;
        const fontSize = isMobile ? "0.6rem" : '1rem';
        const paperMargin = isMobile ? 12 : 32;
        return (
            <Paper
                className={classes.root}
                onClick={this.props.onClick}
                style={{ padding, width, marginLeft: paperMargin }}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                elevation={0}
            >
                <LogoIcon className={classes.primary} style={{ height: size, width: size }} />
                <span className={classes.primary} style={{ marginLeft, fontSize }}>Metada</span>
            </Paper>
        )
    }

}

export default withStyles(styles)(Logo);
import React, { Component } from 'react'
import LogoIcon from "react-icons/lib/go/puzzle"
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';


const styles = theme => ({
    root: {
        "&:hover": {
            'cursor': 'pointer',
        },
        backgroundColor: theme.palette.secondary.main,
        display: 'inline-block',
        textAlign: 'center'
    },
    primary: {
        color: theme.palette.default,
        textTransform: 'uppercase'
    },
    moveLeft: {
        marginLeft: -22,
        transition: "all 0.2s ease-in-out",
    },
    normal: {
        marginLeft: 32,
        transition: "all 0.2s ease-in-out",
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
        let paperStyle = { padding, width }
        if (isMobile) {
            paperStyle.marginLeft = 12;
        }
        return (
            <Paper
                className={classNames(classes.root, this.props.isRehydrated && this.props.show.drawer ? classes.moveLeft : classes.normal)}
                onClick={this.props.onClick}
                style={paperStyle}
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
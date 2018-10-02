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
        display: 'flex',
        textAlign: 'center',
        [theme.breakpoints.up('xs')]: {
            // backgroundColor: 'red',
            padding: '12px 0px',
            marginLeft: 8
        },
    },
    logo: {
        color: theme.palette.default,
        height: 20,
        width: 20,
        [theme.breakpoints.up('sm')]: {
            // backgroundColor: 'red',
            height: 30,
            width: 30,
        },
    },
    title: {
        color: theme.palette.default,
        textTransform: 'uppercase',
        [theme.breakpoints.up('sm')]: {
            // backgroundColor: 'red',
            fontSize: 22,
        },
        marginLeft: 8,
    },
    // moveLeft: {
    //     marginLeft: -22,
    //     transition: "all 0.2s ease-in-out",
    // },
    normal: {
        // marginLeft: 32,
        transition: "all 0.2s ease-in-out",
    }
});

class Logo extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper
                className={classNames(classes.root, this.props.isRehydrated && this.props.show.drawer ? classes.moveLeft : classes.normal)}
                onClick={this.props.onClick}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                elevation={0}
            >
                <LogoIcon className={classes.logo} />
                <span className={classes.title}>Metada</span>
            </Paper>
        )
    }

}

export default withStyles(styles)(Logo);
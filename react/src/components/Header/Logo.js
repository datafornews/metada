import React, { Component } from 'react'
import LogoIcon from "react-icons/lib/go/puzzle"
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { AsyncComponents } from '../../index';


const styles = theme => ({
    logo: {
        [theme.breakpoints.up('xs')]: {
            height: theme.spacing(4),
            width: theme.spacing(4)
        },
        color: theme.palette.default,
        height: theme.spacing(3),
        width: theme.spacing(3)
    },
    normal: {
        transition: "all 0.2s ease-in-out"
    },
    root: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(6),
            padding: '12px 0px'
        },
        "&:hover": {
            'cursor': 'pointer'
        },
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        marginLeft: theme.spacing(5),
        textAlign: 'center'
    },
    title: {
        [theme.breakpoints.up('sm')]: {
            fontSize: 22
        },
        color: theme.palette.default,
        marginLeft: theme.spacing(1),
        textTransform: 'uppercase'
    }
});

class Logo extends Component {

    onMouseEnter = () => {
        console.log('prelaoding main');
        AsyncComponents.home.preload();
        this.props.onMouseEnter && this.props.onMouseEnter();
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper
                className={classNames(classes.root, this.props.isRehydrated && this.props.show.drawer ? classes.moveLeft : classes.normal)}
                onClick={this.props.onClick}
                onMouseEnter={this.onMouseEnter}
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
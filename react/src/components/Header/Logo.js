import React, { Component } from 'react'
import LogoIcon from "react-icons/lib/go/puzzle"
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { AsyncComponents } from '../../index';


const styles = theme => ({
    root: {
        "&:hover": {
            'cursor': 'pointer',
        },
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: theme.spacing.unit * 5,
        [theme.breakpoints.up('sm')]: {
            padding: '12px 0px',
            marginLeft: theme.spacing.unit * 6
        },
    },
    logo: {
        color: theme.palette.default,
        height: theme.spacing.unit * 3,
        width: theme.spacing.unit * 3,
        [theme.breakpoints.up('xs')]: {
            height: theme.spacing.unit * 4,
            width: theme.spacing.unit * 4,
        },
    },
    title: {
        color: theme.palette.default,
        textTransform: 'uppercase',
        [theme.breakpoints.up('sm')]: {
            fontSize: 22,
        },
        marginLeft: theme.spacing.unit,
    },
    normal: {
        transition: "all 0.2s ease-in-out",
    }
});

class Logo extends Component {

    onMouseEnter = () => {
        console.log('prelaoding main');
        AsyncComponents.main.preload();
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
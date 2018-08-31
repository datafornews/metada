import React, { Component } from 'react'
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import HelpIcon from 'react-icons/lib/fa/question-circle';

const timeout = 150;

function shortFade(props) {
    return <Fade timeout={timeout} {...props} />
}

const styles2 = theme => ({

    snack: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, onOk, ...other } = props;

    return (
        <SnackbarContent
            className={classNames(classes.snack, className)}
            message={
                <span id="client-snackbar" className={classes.message}>
                    {message}
                </span>
            }
            action={[
                <Button variant='outlined' key="help" color="primary" onClick={onOk}>
                    Help &nbsp;
                    <HelpIcon style={{ height: 25, width: 25 }} />
                </Button>,
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}
const MySnackbarContentWrapper = withStyles(styles2)(MySnackbarContent);


const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    margin: {
        margin: theme.spacing.unit,
    },
});

class Carousel extends Component {

    state = { open: false }

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
        this.props.toggleNavigationSnackbar()
    };

    blink = (from, times, timeout = 500) => {
        if (times === 0) {
            return
        }
        console.log('Going to blink ', times)
        setTimeout(() => {
            this.setState({
                open: !from
            })
            setTimeout(() => {
                this.setState({
                    open: from
                })
                this.blink(from, times - 1)
            }, timeout)
        }, timeout)

    }


    componentDidMount() {
        if (this.props.isRehydrated && this.props.show.navigationSnackbar && !this.props.show.help) {

            this.setState({
                open: true
            })
            setTimeout(() => {
                this.blink(true, 2, 350)

            }, timeout + 10)
        }
    }



    componentWillUpdate(nextProps, nextState) {
        if (this.props.isRehydrated !== nextProps.isRehydrated && nextProps.isRehydrated) {
            if (nextProps.show.navigationSnackbar && !nextProps.show.help) {

                this.setState({
                    open: true
                })
                setTimeout(() => {
                    this.blink(true, 2, 350)

                }, timeout + 10)
            }
        }
    }


    toggleHelp = () => {
        this.props.show.help ? this.props.stopHelp() : this.props.startHelp();
        this.props.clientType !== "mobile" && setTimeout(this.props.reRenderGraph, 300)
        setTimeout(() => {
            this.setState({
                open: false
            })
        }, 500);
        this.props.toggleNavigationSnackbar(false)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    className={classes.snack}
                    open={this.state.open}
                    autoHideDuration={10000}
                    TransitionComponent={shortFade}
                >
                    <MySnackbarContentWrapper
                        className={classes.margin}
                        message="Savez vous vous déplacer dans le graphe?"
                        onClose={this.handleClose}
                        onOk={this.toggleHelp}
                    />

                </Snackbar>
            </div>
        );
    }
}

export default (withStyles(styles)(Carousel));
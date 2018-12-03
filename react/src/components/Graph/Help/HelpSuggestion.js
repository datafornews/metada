import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import ClearIcon from 'react-icons/lib/md/clear';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import withWidth from '@material-ui/core/withWidth';

const styles = theme => ({
    container: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        zIndex: 1000,
        width: 'min-content',
        [theme.breakpoints.only('xs')]: {
            // backgroundColor: 'red',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(40, 40, 40, 0.5)'
        },
    },
    paper: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.default,
        minWidth: 300,
        position: "relative",
        paddingTop: "12px",
    },
    button: {
        // backgroundColor: theme.palette.default,
        // color: theme.palette.secondary.main,
        minWidth: 150,
        "&:hover": {
            opacity: 0.9
        }
    },
    helpIconButton: {
        color: theme.palette.secondary.main,
        height: 50,
        width: 50
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 75,
        minWidth: 200
    },
    slideContained: {
        maxWidth: 150,
        margin: "auto"
    },
    helpsecondary: {
        color: theme.palette.secondary.main
    },
    helpDefault: {
        color: theme.palette.default,
        height: 40,
        width: 40
    },
    clearIcon: {
        height: 20,
        width: 20,
        color: theme.palette.default,
    },
    clearIconButton: {
        height: 30,
        width: 30,
        position: 'absolute',
        top: 4,
        right: 4
    },
    cardContent: {
        [theme.breakpoints.only('xs')]: {
            // backgroundColor: 'red',
            paddingRight: 32
        },
    }
});

class HelpSuggestion extends Component {

    state = {
        button: true,
    }

    turnOffHelpSuggestion = () => {
        this.props.toggleHelpSuggestion(false);
    }

    displayHelp = () => {
        this.props.toggleHelp(true);
        this.turnOffHelpSuggestion();
    }

    render() {
        const { classes, isRehydrated, show, clientType, width } = this.props;
        const out = !isRehydrated || (isRehydrated && !show.helpSuggestion) || (isRehydrated && width === "xs" && show.drawer);
        const isMobie = clientType === "mobile";
        return (
            <Fade in={!out} unmountOnExit mountOnEnter>

                <div className={classes.container} style={isMobie ? { top: "50%", left: '50%', transform: "translate(-50%, -50%)" } : {}}>
                    <Card elevation={1} className={classes.paper}>
                        <IconButton className={classes.clearIconButton} onClick={this.turnOffHelpSuggestion}>
                            <ClearIcon className={classes.clearIcon} />
                        </IconButton>
                        <CardContent className={classes.cardContent}>
                            Comment naviguer dans le graph?
                    </CardContent>
                        <CardActions
                            className={classes.cardActions}
                        >
                            <div className={classes.slideContained}>
                                <Button
                                    className={classes.button}
                                    color="default"
                                    variant='contained'
                                    onClick={this.displayHelp}
                                >
                                    Suivez le guide!
    
                                </Button>
                            </div>
                        </CardActions>
                    </Card>
                </div >
            </Fade>
        )
    }
}


HelpSuggestion.propTypes = {
    classes: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    isRehydrated: PropTypes.bool.isRequired,
    show: PropTypes.object.isRequired,
    toggleHelp: PropTypes.func.isRequired,
    toggleHelpSuggestion: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired,
};

export default withWidth()(withStyles(styles)(HelpSuggestion));
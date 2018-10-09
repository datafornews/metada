import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import HelpIcon from 'react-icons/lib/fa/question-circle';
import ClearIcon from 'react-icons/lib/md/clear';
import IconButton from '@material-ui/core/IconButton';

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
            transform: 'translate(-50%, 60%)'
        },
    },
    paper: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.default,
        minWidth: 300
    },
    button: {
        // backgroundColor: theme.palette.default,
        // color: theme.palette.secondary.main,
        minWidth: 150,
        "&:hover":{
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
        top: 8,
        right: 8
    }
});

class HelpSuggestion extends Component {

    state = {
        button: true,
    }

    render() {
        const { classes, toggleHelp, toggleHelpSuggestion, isRehydrated, show, clientType } = this.props;
        if (!isRehydrated || (isRehydrated && !show.helpSuggestion)) {
            return ''
        }
        const isMobie = clientType === "mobile";
        return (
            <div className={classes.container} style={isMobie ? { top: "50%", left: '50%', transform: "translate(-50%, -50%)" } : {}}>
                <Card elevation={1} className={classes.paper}>
                    <IconButton className={classes.clearIconButton} onClick={() => { toggleHelpSuggestion(false) }}>
                        <ClearIcon className={classes.clearIcon} />
                    </IconButton>
                    <CardContent>
                        Comment naviguer dans le graph?
                    </CardContent>
                    <CardActions
                        onMouseEnter={() => { this.setState({ button: false }) }}
                        onMouseLeave={() => { this.setState({ button: true }) }}
                        className={classes.cardActions}
                    >

                        <Slide mountOnEnter unmountOnExit direction="left" in={this.state.button || 1}>
                            <div className={classes.slideContained}>
                                <Button
                                    className={classes.button}
                                    color="default"
                                    variant='contained'
                                >
                                    Suivez le guide!

                                </Button>
                            </div>
                        </Slide>
                        <Slide mountOnEnter unmountOnExit direction="right" in={!this.state.button && 0} timeout={{ enter: 400 }}>
                            <div className={classes.slideContained}>
                                <IconButton
                                    onClick={() => { toggleHelpSuggestion(false); toggleHelp(true) }}
                                    className={classes.helpIconButton}
                                    color="secondary"
                                >
                                    <HelpIcon className={classes.helpDefault} />
                                </IconButton>
                            </div>
                        </Slide>

                    </CardActions>
                </Card>
            </div >
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
};

export default withStyles(styles)(HelpSuggestion);
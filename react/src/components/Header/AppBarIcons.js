import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from 'react-icons/lib/fa/question-circle';
import IssueIcon from 'react-icons/lib/fa/exclamation-circle';

const styles = theme => ({
    iconButton: {
        margin: '0px 4px',
        maxWidth: theme.spacing.unit * 6,
        width: '45%'
    }
});

class AppBarIcons extends Component {
    render() {
        const { classes, toggleHelp, toggleIssue, isGraph, width, show } = this.props;
        return <Grow
            mountOnEnter
            unmountOnExit
            in={isGraph && !(width === "xs" && show.drawer)}
            timeout={{
                enter: 300,
                exit: 0
            }}
        >
            <div style={{ display: "inline-flex", justifyContent: 'flex-start' }} className='joyride-appbaricons'>
                <IconButton
                    onClick={toggleIssue}
                    style={{ color: "white" }}
                    className={classes.iconButton}
                >
                    <IssueIcon />
                </IconButton>

                <IconButton
                    onClick={toggleHelp}
                    style={{ color: "white" }}
                    className={classes.iconButton}
                >
                    <HelpIcon />
                </IconButton>
            </div>
        </Grow>
    }
}

AppBarIcons.propTypes = {
    classes: PropTypes.object.isRequired,
    isGraph: PropTypes.bool.isRequired,
    show: PropTypes.object.isRequired,
    toggleHelp: PropTypes.func.isRequired,
    toggleIssue: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired,
};

export default withStyles(styles)(AppBarIcons);
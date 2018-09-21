import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const styles = theme => ({
    container: {
        position: 'absolute',
        top: 100,
        right: 100,
        zIndex: 1000,
        width: 'min-content'
    },
    paper: {
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        maxWidth: 100,
        color: theme.palette.default,
    }
});

class HelpSuggestion extends Component {
    render() {
        const { classes, toggleHelp, toggleHelpSuggestion, isRehydrated, show, clientType } = this.props;
        if (!isRehydrated || (isRehydrated && !show.helpSuggestion)) {
            return ''
        }
        const isMobie = clientType === "mobile";
        return (
            <div className={classes.container} style={isMobie ? { top: "50%", left: '50%', transform: "translate(-50%, -50%)" } : {}}>
                <Card elevation={1} className={classes.paper}>
                    <CardContent>
                        <Button
                            onClick={() => { toggleHelpSuggestion(false); toggleHelp(true) }}
                            className={classes.button}
                        >
                            Comment naviguer dans le graph?
                        </Button>
                    </CardContent>
                </Card>
            </div>
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
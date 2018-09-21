import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import IssueIcon from 'react-icons/lib/fa/exclamation-circle';
import HelpIcon from 'react-icons/lib/fa/question-circle';


const styles = theme => ({
    subtitle: {
        marginBottom: 12,
        fontSize: 14,
    },
    pos: {
        marginBottom: 8,
        fontSize: 12
    },
    iconContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: 6
    },
    primary: {
        fontWeight: 'bolder',
        color: theme.palette.primary.main,
        fontSize: '0.85rem'
    }
});

class NavigationHelp extends Component {
    render() {
        const { classes, translate } = this.props;
        // const shiftUnicode = '\u21E7';

        return (
            <div>

                <Typography variant="subheading" className={classes.subtitle} component="h4">
                    {translate('graph.helpCard.navigation')}
                </Typography>

                <Typography className={classes.pos} color="textSecondary" component="div">
                    <span className={classes.primary} >
                        {translate('graph.helpCard.contextual')}
                    </span>
                    {translate('graph.helpCard.contextualAfter')}

                    <br /><br />

                    {translate("graph.helpCard.doubleTapBefore")}
                    <span className={classes.primary} >{translate("graph.helpCard.doubleTap")}</span>
                    {translate("graph.helpCard.doubleTapAfter")}


                    <br />
                    <br />
                    <div className={classes.iconContainer}><IssueIcon style={{ height: 20, width: 20 }} /> &nbsp; {translate("graph.helpCard.issue")}</div>
                    <div className={classes.iconContainer}><HelpIcon style={{ height: 20, width: 20 }} /> &nbsp; {translate("graph.helpCard.help")}</div> <br />
                </Typography>
            </div>
        )
    }
}

NavigationHelp.propTypes = {
    classes: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

export default withStyles(styles)(NavigationHelp);
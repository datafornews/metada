import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(17),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: theme.palette.text.primary
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class Expansion extends Component {
    render() {
        let browserWidth = navigator.userAgent.toLocaleLowerCase().indexOf('firefox') > -1 ?
            '-moz-available' : '-webkit-fill-available';

        const { classes } = this.props;
        return (
            <div className={classes.root} style={{ width: browserWidth, margin: "15px auto 0px auto" }}>
                <ExpansionPanel disabled={false} expanded={this.props.expanded} onChange={this.props.handleChange}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading} component="div">
                            {this.props.summaryHeading || ''}
                        </Typography>
                        <Typography className={classes.secondaryHeading} component="div">
                            {this.props.summarySecondaryHeading || ''}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography component="div" style={{ width: '100%' }}>
                            {this.props.content}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

Expansion.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expansion);
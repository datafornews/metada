import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import { colors } from '../../../theme/metadaTheme';

const styles = theme => ({
    title: {
        marginBottom: 16,
        fontSize: 18,
    },
    subtitle: {
        marginBottom: 12,
        fontSize: 14,
    },
    pos: {
        marginBottom: 8,
        fontSize: 12
    },
    m: {
        backgroundColor: colors['m']
    },
    c: {
        backgroundColor: colors['c']
    },
    i: {
        backgroundColor: colors['i']
    },
    chip: {
        color: "white",
    },
    chipContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '4px'
    }
});

class LegendHelp extends Component {
    render() {
        const { classes, translate } = this.props;

        return (
            <div>
                <Typography variant="subheading" className={classes.subtitle} component="h4">
                    {translate('graph.helpCard.legend.title')}
                </Typography>
                <Typography className={classes.pos} color="textSecondary" component="div">
                    {translate('graph.helpCard.legend.intro')}

                    <div className={classes.chipContainer}>
                        <Chip
                            // avatar={<Avatar>{avatarName}</Avatar>}
                            label={translate(`home.cards.category.i`)}
                            className={classNames(classes.chip, classes.i)}
                        />
                        &nbsp;
                                <Chip
                            // avatar={<Avatar>{avatarName}</Avatar>}
                            label={translate(`home.cards.category.c`)}
                            className={classNames(classes.chip, classes.c)}
                        />
                        &nbsp;
                                <Chip
                            // avatar={<Avatar>{avatarName}</Avatar>}
                            label={translate(`home.cards.category.m`)}
                            className={classNames(classes.chip, classes.m)}
                        />
                    </div>
                    <br />
                    {translate("graph.helpCard.selectedBefore")}
                    <span style={{ fontWeight: "bolder", color: colors.accent }}>{translate("graph.helpCard.selected")} </span>
                    {translate("graph.helpCard.selectedAfter")}
                    <br />
                    <br />
                    {translate("graph.helpCard.representedBefore")}
                    <span style={{
                        // fontWeight: "bold",
                        color: "white",
                        border: "2px solid rgba(0, 0, 0, 0)",
                        backgroundColor: "rgba(0, 0, 0, 0.54)",
                        borderRadius: "10px",
                        marginLeft: "4px",
                        marginRight: "4px",
                        paddingLeft: "4px"
                    }}>{translate("graph.helpCard.represented")} </span>
                    {translate("graph.helpCard.representedAfter")}


                </Typography>
            </div >
        )
    }
}

LegendHelp.propTypes = {
    classes: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

export default withStyles(styles)(LegendHelp);
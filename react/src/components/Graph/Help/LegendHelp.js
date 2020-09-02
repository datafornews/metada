import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import { colors } from '../../../theme/metadaTheme';

const styles = theme => ({
    c: {
        backgroundColor: colors['c']
    },
    chip: {
        color: "white",
        marginLeft: 8,
        marginRight: 8
    },
    chipContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px'
    },
    i: {
        backgroundColor: colors['i']
    },
    m: {
        backgroundColor: colors['m']
    },
    pos: {
        // fontSize: 12,
        marginBottom: 8
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 24
    }
});

class LegendHelp extends Component {
    render() {
        const { classes, translate } = this.props;

        return (
            <div>
                <Typography variant="subtitle2" className={classes.subtitle} component="h4">
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
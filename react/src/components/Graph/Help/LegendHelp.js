import React, { Component } from 'react';
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
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="subheading" className={classes.subtitle} component="h4">
                    {this.props.translate('graph.helpCard.legend.title')}
                </Typography>
                <Typography className={classes.pos} color="textSecondary" component="div">
                    {this.props.translate('graph.helpCard.legend.intro')}

                    <div className={classes.chipContainer}>
                        <Chip
                            // avatar={<Avatar>{avatarName}</Avatar>}
                            label={this.props.translate(`home.cards.category.i`)}
                            className={classNames(classes.chip, classes.i)}
                        />
                        &nbsp;
                                <Chip
                            // avatar={<Avatar>{avatarName}</Avatar>}
                            label={this.props.translate(`home.cards.category.c`)}
                            className={classNames(classes.chip, classes.c)}
                        />
                        &nbsp;
                                <Chip
                            // avatar={<Avatar>{avatarName}</Avatar>}
                            label={this.props.translate(`home.cards.category.m`)}
                            className={classNames(classes.chip, classes.m)}
                        />
                    </div>
                    <br />
                    {this.props.translate("graph.helpCard.selectedBefore")}
                    <span style={{ fontWeight: "bolder", color: colors.accent }}>{this.props.translate("graph.helpCard.selected")} </span>
                    {this.props.translate("graph.helpCard.selectedAfter")}
                    <br />
                    <br />
                    {this.props.translate("graph.helpCard.representedBefore")}
                    <span style={{
                        // fontWeight: "bold",
                        color: "white",
                        border: "2px solid rgba(0, 0, 0, 0)",
                        backgroundColor: "rgba(0, 0, 0, 0.54)",
                        borderRadius: "10px",
                        marginLeft: "4px",
                        marginRight: "4px",
                        paddingLeft: "4px"
                    }}>{this.props.translate("graph.helpCard.represented")} </span>
                    {this.props.translate("graph.helpCard.representedAfter")}


                </Typography>
            </div >
        )
    }
}

export default withStyles(styles)(LegendHelp);
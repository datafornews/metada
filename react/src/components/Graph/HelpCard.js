import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import classNames from 'classnames';

import Chip from '@material-ui/core/Chip';

import ResetIcon from 'react-icons/lib/fa/refresh';
import DescriptionIcon from 'react-icons/lib/fa/file-text';
import CenterFocusStrongIcon from 'react-icons/lib/fa/sitemap';
import IssueIcon from 'react-icons/lib/fa/exclamation-circle';
import HelpIcon from 'react-icons/lib/fa/question-circle';

const colors = {
    m: '#3f51b5',
    c: 'rgb(187, 45, 45)',
    i: 'rgb(1, 41, 71)'
}

const styles = theme => ({
    card: {
        maxWidth: 375,
        pointerEvents: "all",
        marginBottom: 16,
        zIndex: 201
    },
    noClick: {
        pointerEvents: "none"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
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
        fontSize:12
    },
    actions: {
        display: 'flex',
        justifyContent: "flex-end",
        paddingTop: 0
    },
    iconContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: 6
    },
    chip: {
        color: "white",
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
    chipContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '4px'
    }
});

class HelpCard extends Component {


    state = {
        grow: false
    }

    close = () => {
        this.setState({
            grow: false
        })
        this.props.stopHelp();

        this.props.clientType !== "mobile" && setTimeout(this.props.reRenderGraph, 300);

    }


    componentWillMount() {
        if (!this.props.show.help ) {
            this.setState({
                grow: false
            })
        } else {
            setTimeout(() => {
                if (this.props.show.help) {
                    this.setState({
                        grow: true
                    })
                }
            }, 500)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.show.help !== nextProps.show.help) {
            this.setState({
                grow: nextProps.show.help
            })
        }
    }



    render() {
        console.log(this.props.isRehydrated);
        console.log(this.props);
        const { classes } = this.props;
        const shiftUnicode = '\u21E7'
        return (
            <Slide direction="down" in={this.state.grow} mountOnEnter unmountOnExit>
                <Card className={classNames(classes.card, !this.state.grow && classes.noClick)} elevation={24}>
                    <CardContent style={{ paddingBottom: 0 }}>
                        <Typography className={classes.title} color="textSecondary">
                            {this.props.translate('graph.helpCard.title')}
                        </Typography>

                        <Typography className={classes.pos} color="textSecondary" component="div">
                            <span style={{ fontWeight: "bolder" }}>
                                {this.props.translate('graph.helpCard.contextual')}
                            </span>
                            {this.props.translate('graph.helpCard.contextualAfter')}
                            <br /><br />
                            {this.props.translate("graph.helpCard.doubleTapBefore")}
                            <span style={{ fontWeight: "bolder" }}>{this.props.translate("graph.helpCard.doubleTap")}</span>
                            {this.props.translate("graph.helpCard.doubleTapAfter")}
                        </Typography>

                        <Typography variant="subheading" className={classes.subtitle} component="h4">
                            {this.props.translate('graph.helpCard.buttons')}
                        </Typography>

                        <Typography className={classes.pos} color="textSecondary" component="div">
                            <div className={classes.iconContainer}><ResetIcon style={{ height: 20, width: 20 }} /> &nbsp; {this.props.translate("graph.helpCard.reset")}</div>
                            <div className={classes.iconContainer}><DescriptionIcon style={{ height: 20, width: 20 }} /> &nbsp; {this.props.translate("graph.helpCard.description")}</div>
                            <div className={classes.iconContainer}><CenterFocusStrongIcon style={{ height: 20, width: 20 }} /> &nbsp; {this.props.translate("graph.helpCard.focus")}</div>
                            <div className={classes.iconContainer}><IssueIcon style={{ height: 20, width: 20 }} /> &nbsp; {this.props.translate("graph.helpCard.issue")}</div>
                            <div className={classes.iconContainer}><HelpIcon style={{ height: 20, width: 20 }} /> &nbsp; {this.props.translate("graph.helpCard.help")}</div> <br />

                            {this.props.clientType !== "mobile" && (
                                <span>
                                    {this.props.translate('graph.sideButtons.shift') + shiftUnicode + this.props.translate('graph.sideButtons.shift2')}
                                    &nbsp;
                                    {this.props.translate('graph.sideButtons.shift3')}
                                    &nbsp;
                                    {this.props.translate('graph.sideButtons.shift4')}
                                </span>
                            )
                            }

                        </Typography>
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
                            <span style={{ fontWeight: "bolder", color: "green" }}>{this.props.translate("graph.helpCard.selected")} </span>
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
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button onClick={this.close} size="small">Ok</Button>
                    </CardActions>
                </Card>
            </Slide>
        );
    }
}


HelpCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelpCard);
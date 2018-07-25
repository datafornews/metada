import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import classNames from 'classnames';

import ResetIcon from '@material-ui/icons/Autorenew';
import DescriptionIcon from '@material-ui/icons/Description';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';

const styles = theme => ({
    card: {
        maxWidth: 375,
        pointerEvents: "all"
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
        marginBottom: 12,
    },
    actions: {
        display: 'flex',
        justifyContent: "flex-end"
    },
    iconContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: 6
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

        setTimeout(this.props.reRenderGraph, 300)

    }


    componentWillMount() {
        if (!this.props.show.help) {
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
        const { classes } = this.props;
        const shiftUnicode = '\u21E7'
        return (
            <Grow in={this.state.grow}>
                <Card className={classNames(classes.card, !this.state.grow && classes.noClick)} elevation={24}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            {this.props.translate('graph.helpCard.title')}
                        </Typography>
                        <Typography variant="subheading" className={classes.subtitle} component="h4">
                            {this.props.translate('graph.helpCard.buttons')}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            <div className={classes.iconContainer}><ResetIcon /> &nbsp; {this.props.translate("graph.helpCard.reset")}</div>
                            <div className={classes.iconContainer}><DescriptionIcon /> &nbsp; {this.props.translate("graph.helpCard.description")}</div>
                            <div className={classes.iconContainer}><CenterFocusStrongIcon /> &nbsp; {this.props.translate("graph.helpCard.focus")}</div> <br />
                            {this.props.translate("graph.helpCard.doubleTapBefore")}
                            <span style={{ fontWeight: "bolder" }}>{this.props.translate("graph.helpCard.doubleTap")}</span>
                            {this.props.translate("graph.helpCard.doubleTapAfter")}

                            <br />
                            <br />

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
                            {this.props.translate('graph.helpCard.descriptionPannel.title')}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {this.props.translate('graph.helpCard.descriptionPannel.intro')}
                            <ul>
                                <li>{this.props.translate('graph.helpCard.descriptionPannel.help')}</li>
                                <li>{this.props.translate('graph.helpCard.descriptionPannel.legend')}</li>
                                <li>{this.props.translate('graph.helpCard.descriptionPannel.issue')}</li>
                            </ul>

                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button onClick={this.close} size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grow>
        );
    }
}


HelpCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelpCard);
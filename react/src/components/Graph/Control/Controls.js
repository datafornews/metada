import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { colors } from '../../../theme/metadaTheme';
import GraphHistoryNavigation from "./History/GraphHistoryNavigation"

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => (
    {
        container: {
            display: 'flex',
            position: 'relative',
            width: '100%',
        },
        buttons: {
            display: "flex",
            justifyContent: "space-around",
            minWidth: 300,
            alignItems: 'center'
        },
        actionButton: {
            fontSize: '0.85rem',
            fontWeight: 800,
            color: theme.palette.primary.main,
            backgroundColor: "white"
        },
        shiftLeft: {
            marginLeft: theme.spacing.unit * 2,
        },
        entity: {
            textAlign: "center",
            marginBottom: theme.spacing.unit / 2
        },
        wrapper: {
            display: 'inline-block',
            margin: 'auto',
        },
        entityName: {
            [theme.breakpoints.down('sm')]: {
                fontSize: 20
            },
            [theme.breakpoints.only('md')]: {
                marginTop: 2 * theme.spacing.unit
            }
        },
        boldText: {
            fontSize: theme.typography.title.fontSize
        },
        dialogContent: {
            marginTop: theme.spacing.unit
        }
    }
);

class Controls extends Component {

    state = {
        doubleClickHelp: false,
        longClickHelp: false
    }

    goTo = () => {
        if (this.props.show.doubleClickHelp) {
            this.setState({
                doubleClickHelp: true
            });
        } else {
            this.move();
        }
    }

    seeDescription = () => {
        if (this.props.show.longClickHelp) {
            this.setState({
                longClickHelp: true
            });
        } else {
            this.props.toggleDrawer();
        }
    }

    handleClose = () => {
        if (this.state.doubleClickHelp) {
            this.props.toggleDoubleClickHelp();
            this.setState({
                doubleClickHelp: false,
                longClickHelp: false
            });
            this.move()
        } else if (this.state.longClickHelp) {
            this.props.toggleLongClickHelp();
            this.setState({
                doubleClickHelp: false,
                longClickHelp: false
            });
            this.props.toggleDrawer();
        }
    }

    move = () => {
        const newLoc = `/graph/${this.props.data.entities.ids[this.props.infoBox.entity].id}`;
        this.props.history.push(newLoc);
        this.props.updateRouterLocation(newLoc);
    }

    render() {

        const { classes, infoBox, match, data, clientType, translate, show,
            routerLocations, history, goToPreviousGraph, updateEntityInfoBox,
            goToNextGraph } = this.props;

        const selectedIsRepresented = parseInt(infoBox.entity, 10) === parseInt(match.params.entityId, 10);
        const entity = data.entities.ids[infoBox.entity];
        return (
            <div
                className={classes.container}
            >

                <GraphHistoryNavigation
                    clientType={clientType}
                    translate={translate}
                    routerLocations={routerLocations}
                    goToPreviousGraph={goToPreviousGraph}
                    goToNextGraph={goToNextGraph}
                    updateEntityInfoBox={updateEntityInfoBox}
                    history={history}
                    show={show}
                />
                <div className={classes.wrapper}>

                    <div className={classes.entity} style={{
                        color: selectedIsRepresented ? colors[entity.category] : colors.accent
                    }}>
                        {entity && <Typography className={classes.entityName} style={clientType === "extension" ? { maxWidth: '270px' } : {}} variant="display1">{entity.name}</Typography>}
                    </div>
                    <div className={classes.buttons}>
                        {
                            !show.drawer &&
                            <Button className={classes.actionButton} variant="contained" classes={{ text: classes.text }} onClick={this.seeDescription}>
                                Description
                            </Button>
                        }
                        {
                            selectedIsRepresented ? '' :
                                <Button
                                    className={classNames(
                                        classes.actionButton,
                                        !show.drawer && classes.actionButton
                                    )}
                                    variant="contained"
                                    classes={{ text: classes.text }}
                                    onClick={this.goTo}>
                                    Voir le Graph
                                </Button>
                        }
                    </div>
                </div>
                <Dialog
                    open={this.state.doubleClickHelp || this.state.longClickHelp}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <DialogTitle>
                        <Typography variant="display1">
                            {"Le saviez vous?"}
                        </Typography>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <DialogContentText>
                            <Typography variant="body1">
                                {this.state.doubleClickHelp && (
                                    <span>
                                        {translate("graph.helpCard.doubleTapBefore")}
                                        <span className={classes.boldText}>
                                            {translate("graph.helpCard.doubleTap")}
                                        </span>
                                        {translate("graph.helpCard.doubleTapAfter")}
                                    </span>
                                )}

                                {this.state.longClickHelp && (
                                    <span>
                                        <span className={classes.boldText}>
                                            {translate('graph.helpCard.contextual')}
                                        </span>
                                        {translate('graph.helpCard.contextualAfter')}
                                    </span>
                                )}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Compris!
                    </Button>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}

Controls.propTypes = {
    classes: PropTypes.object.isRequired,
    clientType: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    goToPreviousGraph: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    infoBox: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    routerLocations: PropTypes.object.isRequired,
    show: PropTypes.object.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    toggleLongClickHelp: PropTypes.func.isRequired,
    toggleDoubleClickHelp: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    updateEntityInfoBox: PropTypes.func.isRequired,
    updateRouterLocation: PropTypes.func.isRequired,
};

export default (withStyles(styles)(Controls));
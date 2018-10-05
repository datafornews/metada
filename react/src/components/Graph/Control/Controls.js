import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../../theme/metadaTheme';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import GraphHistoryNavigation from "./History/GraphHistoryNavigation"
import PropTypes from 'prop-types';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => (
    {
        container: {
            display: 'flex',
            position: 'relative'
        },
        buttons: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
        },
        desc: {
            fontSize: '0.85rem',
            fontWeight: 800,
            color: theme.palette.primary.main,
        },
        graph: {
            marginLeft: theme.spacing.unit * 2,
            fontSize: '0.85rem',
            fontWeight: 800,
            color: theme.palette.primary.main,
        },
        entity: {
            textAlign: "center",
            marginBottom: theme.spacing.unit / 2
        },
        wrapper: {
            display: 'inline-block',
            margin: 'auto',
            [theme.breakpoints.only('xs')]: {
                marginTop: theme.spacing.unit * 4,
            }
        },
        entityName: {
            [theme.breakpoints.down('sm')]: {
                fontSize: 20
            }
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
            style={{ marginTop: clientType === 'mobile' ? 40 : 8 }}
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
                            <Button className={classes.desc} variant="text" classes={{ text: classes.text }} onClick={this.seeDescription}>
                                Description
                            </Button>
                        }
                        {
                            selectedIsRepresented ? '' :
                                <Button className={classes.graph} variant="text" classes={{ text: classes.text }} onClick={this.goTo}>
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
                    <DialogTitle>{"Did you know?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.doubleClickHelp && (
                                <span>
                                    {translate("graph.helpCard.doubleTapBefore")}
                                    <span style={{ fontWeight: "bolder" }}>
                                        {translate("graph.helpCard.doubleTap")}
                                    </span>
                                    {translate("graph.helpCard.doubleTapAfter")}
                                </span>
                            )}

                            {this.state.longClickHelp && (
                                <span>
                                    <span style={{ fontWeight: "bolder" }}>
                                        {translate('graph.helpCard.contextual')}
                                    </span>
                                    {translate('graph.helpCard.contextualAfter')}
                                </span>
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Got it!
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
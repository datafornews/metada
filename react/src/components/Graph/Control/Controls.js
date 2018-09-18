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
            fontSize: '0.7rem',
        },
        graph: {
            marginLeft: 16,
            fontSize: '0.7rem'
        },
        entity: {
            minWidth: 200,
            textAlign: "center",
            marginBottom: 4
        },
        wrapper: {
            display: 'inline-block',
            margin: 'auto'
        },
        text: {
            color: theme.palette.secondary.main,
            fontWeight: "bolder"
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
        const newLoc = `/graph/${this.props.data.entities.ids[this.props.infoBox.data].id}`;
        this.props.history.push(newLoc);
        this.props.updateRouterLocation(newLoc);
    }

    render() {
        const selectedIsRepresented = parseInt(this.props.infoBox.data, 10) === parseInt(this.props.match.params.entityId, 10);
        const entity = this.props.data.entities.ids[this.props.infoBox.data];
        const { classes, ...noClassProps } = this.props
        return (
            <div className={classes.container} style={{ marginTop: this.props.clientType === 'mobile' ? 40 : 8 }}>
                <GraphHistoryNavigation {...noClassProps} />
                <div className={classes.wrapper}>

                    <div className={classes.entity} style={{
                        color: selectedIsRepresented ? colors[entity.category] : colors.accent
                    }}>
                        {entity && <Typography variant="display1">{entity.name}</Typography>}
                    </div>
                    <div className={classes.buttons}>
                        <Button color="default" className={classes.desc} variant="text" classes={{ text: classes.text }} onClick={this.seeDescription}>Description</Button>
                        {selectedIsRepresented ? '' : <Button color="default" className={classes.graph} variant="text" classes={{ text: classes.text }} onClick={this.goTo}>Voir le Graph</Button>}
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
                                    {this.props.translate("graph.helpCard.doubleTapBefore")}
                                    <span style={{ fontWeight: "bolder" }}>
                                        {this.props.translate("graph.helpCard.doubleTap")}
                                    </span>
                                    {this.props.translate("graph.helpCard.doubleTapAfter")}
                                </span>
                            )}

                            {this.state.longClickHelp && (
                                <span>
                                    <span style={{ fontWeight: "bolder" }}>
                                        {this.props.translate('graph.helpCard.contextual')}
                                    </span>
                                    {this.props.translate('graph.helpCard.contextualAfter')}
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

export default (withStyles(styles)(Controls));
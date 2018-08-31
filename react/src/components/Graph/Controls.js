import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../theme/metadaTheme';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => (
    {
        container: {
            // backgroundColor: 'white',
            display: 'flex',
            // position: 'absolute',
            // left: "50%",
            // transform: "translate(-50%, 0)",
            // zIndex: 100
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
        this.props.history.push(`/graph/${this.props.data.entities.ids[this.props.infoBox.data].id}`)
    }

    render() {
        const selectedIsRepresented = parseInt(this.props.infoBox.data, 10) === parseInt(this.props.match.params.entityId, 10);
        const entity = this.props.data.entities.ids[this.props.infoBox.data];
        const { classes } = this.props
        return (
            <div className={classes.container} style={{ marginTop: this.props.clientType === 'mobile' ? 56 : 8 }}>
                <div className={classes.wrapper}>

                    <div className={classes.entity} style={{
                        color: selectedIsRepresented ? colors[entity.category] : colors.accent
                    }}>
                        {entity && entity.name}
                    </div>
                    <div className={classes.buttons}>
                        <Button color="primary" className={classes.desc} size="large" variant="outlined" onClick={this.seeDescription}>Description</Button>
                        {selectedIsRepresented ? '' : <Button color="primary" className={classes.graph} size="large" variant="outlined" onClick={this.goTo}>Voir le Graph</Button>}
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
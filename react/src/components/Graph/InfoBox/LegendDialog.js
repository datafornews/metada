import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Legend from '../SideButtons/Legend';

const styles = theme => ({
    card: {
        // minWidth: 275,
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
    pos: {
        marginBottom: 12,
    },
    actions: {
        display: 'flex',
        justifyContent: "flex-end"
    }
});

class LegendDialog extends Component {


    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    }

    handleRequestClose = () => {
        this.setState({ dialogOpen: false });
    }

    state = {
        dialogOpen: false,
    }

    render() {
        const { classes } = this.props;
        let { fullScreen } = this.props;

        const title = this.props.translate('graph.sideButtons.legend.title');

        if (this.props.clientType === 'extension' || window.innerWidth > 650) {
            fullScreen = false;
        }

        return (<div>
            <Button onClick={this.handleClickOpen}>
                Legend
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={this.state.dialogOpen}
                onClose={this.handleRequestClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Typography className={classes.title} color="textSecondary">
                    </Typography>
                    <Legend {...this.props} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRequestClose} size="small">Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
        );
    }
}


LegendDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withMobileDialog()(withStyles(styles)(LegendDialog));
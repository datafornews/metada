/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Icon from 'material-ui-icons/PriorityHigh';
import Button from 'material-ui/Button';
import { SideElement } from '../SideButtons/SideElement';


const buttonPosition = {
    'browser': {
        position: 'absolute',
        right: '16%',
        top: '40%',
        border: '2px #ff7543 solid',
        borderRadius: '50px'
    },
    'extension': {
        position: 'absolute',
        right: '70px',
        top: '40%',
    },
    'mobile': {
        position: 'absolute',
        right: '1%',
    }
}


class ResponsiveDialog extends React.Component {
    state = {
        dialogOpen: false,
    }

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    }

    handleRequestClose = () => {
        this.setState({ dialogOpen: false });
    }

    render() {

        const title = this.props.translate('graph.sideButtons.issueTooltip')

        let { fullScreen } = this.props;
        if (this.props.clientType === 'extension' || window.innerWidth > 650) {
            fullScreen = false;
        }

        return (
            <div style={buttonPosition[this.props.clientType]}>
                <SideElement
                    id="tooltip-Issue"
                    title={title}
                    placement="left"
                    content={<Icon style={{ color: '#ff7543' }} />}
                    onClick={this.handleClickOpen}
                    {...this.props}
                    button
                />
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.dialogOpen}
                    onClose={this.handleRequestClose}
                >
                    <DialogTitle>{this.props.translate('graph.issue.dialogTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontSize: '0.9rem' }}>
                            {this.props.translate('graph.issue.dialogContentText')}<br /><br />
                            Google Form : <a href={this.props.translate('graph.issue.form')} target="_blank" rel="noopener noreferrer">{this.props.translate('graph.issue.form')}</a><br />
                            Email : <a href="mailto:contact@metada.org" target="_blank" rel="noopener noreferrer">contact@metada.org</a> {this.props.translate('graph.issue.object')}<br /><br />
                            {this.props.translate('graph.issue.dialogContentText2')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ fontSize: '0.9rem' }} onClick={this.handleRequestClose} color="primary">
                            {this.props.translate('graph.issue.closeButton')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);
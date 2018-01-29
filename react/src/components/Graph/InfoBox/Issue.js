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
import EditGraph from '../../Home/Content/Contrib/EditGraph/EditGraph'
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';


const buttonPosition = {
    'browser': {
        position: 'absolute',
        right: '15%',
    },
    'extension': {
        position: 'absolute',
        right: '70px',
    },
    'mobile': {
        position: 'absolute',
        right: '1%',
    }
}

const clearButtonStyle = {
    position: 'absolute',
    'right': '10px',
    'top': '10px'
};


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
                    maxWidth={'md'}
                >
                    <DialogTitle>
                        {this.props.translate('graph.issue.dialogTitle') + '  '}
                        ({this.props.data.entities.ids[this.props.infoBox.data].name})
                        </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontSize: '0.9rem', width:'80%' }}>
                            {this.props.translate('graph.issue.dialogContentText')}<br /><br />
                            Google Form : <a href={this.props.translate('graph.issue.form')} target="_blank" rel="noopener noreferrer">{this.props.translate('graph.issue.form')}</a><br />
                            Email : <a href="mailto:contact@metada.org" target="_blank" rel="noopener noreferrer">contact@metada.org</a> {this.props.translate('graph.issue.object')}<br /><br />
                            {this.props.translate('graph.issue.dialogContentText2')}
                        </DialogContentText>
                        <EditGraph {...this.props} entityId={this.props.infoBox.data} />
                    </DialogContent>

                    <IconButton onClick={this.handleRequestClose} style={clearButtonStyle}>
                        <ClearIcon />
                    </IconButton>

                </Dialog>
            </div>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import HowItWorksText from './HowItWorksText'

const fullScreenMinWidth = 650;

const buttonDivPositionStyle = {
  position: 'absolute',
  right: '24px',
  top: '10px'
};
const buttonStyle = {
  width: '40px',
  minWidth: '40px'
};

const iconStyle = {
  width: '30px',
  height: '30px'
}

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    let { fullScreen } = this.props;
    if (this.props.clientType === 'extension' || window.innerWidth > fullScreenMinWidth) {
      fullScreen = false;
    }

    return (
      <div style={buttonDivPositionStyle}>
        <IconButton style={buttonStyle} onClick={this.handleClickOpen}>
          <HelpOutlineIcon
            style={iconStyle}
          />
        </IconButton>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleRequestClose}
        >
          <DialogTitle>{this.props.translate('home.intro.dialogButton')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <HowItWorksText {...this.props} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              {this.props.translate('home.intro.closeButton')}
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
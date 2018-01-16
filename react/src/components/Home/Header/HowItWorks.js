/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import HowItWorksText from './HowItWorksText'
import Icon from 'material-ui-icons/HelpOutline';

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
        <Button style={buttonStyle} onClick={this.handleClickOpen}><Icon style={iconStyle} /></Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
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
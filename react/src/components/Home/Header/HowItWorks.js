/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
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
};
const buttonStyle = {
  width: '10',
  minWidth: '10'
};

const iconStyle = {
  width: '20px',
  height: '20px'
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

        <div style={{ display: 'flex', "alignItems": 'center' }}>
          <IconButton style={buttonStyle} onClick={this.handleClickOpen}><Icon style={iconStyle} /></IconButton>
        </div >
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
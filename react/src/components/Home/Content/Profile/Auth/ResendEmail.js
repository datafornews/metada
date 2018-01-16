import React, { Component } from 'react'
import Icon from 'react-icons/lib/go/gift';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui-icons/Refresh'

const buttonStyle = {
    width: '50px',
    minWidth: '20px'
};


export default class ResendEmail extends Component {

    state = {
        refreshStatusDisabled: false,
        resendDisabled: false
    }

    handleResendClick = (event) => {
        this.props.resendEmail()
        this.setState({
            resendDisabled: true
        });
        setTimeout(
            () => {
                this.setState({ resendDisabled: false })
            }, 1500)
    }

    handleRefreshStatusClick = (event) => {
        this.props.setUserStatus(this, true);
        this.setState({
            refreshStatusDisabled: true
        });
        setTimeout(
            () => {
                if (!JSON.parse(localStorage['reduxPersist:user']).isConfirmed) {
                    this.setState({ refreshStatusDisabled: false })
                }
            }, 10000)
    }

    render() {
        return (
            <div>
                {this.props.translate('home.profile.resend.confirm')}
                <IconButton onClick={this.handleRefreshStatusClick} style={buttonStyle} disabled={this.state.refreshStatusDisabled}>
                    <RefreshIcon />
                </IconButton>
                <br /><br />
                {this.props.translate('home.profile.resend.notReceived')}

                <IconButton onClick={this.handleResendClick} style={buttonStyle} disabled={this.state.resendDisabled}>
                    <Icon />
                </IconButton>
            </div>
        )
    }
}

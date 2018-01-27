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
        resendDisabled: false,
        resendTimeOut: null,
        refreshTimeOut: null
    }

    handleResendClick = (event) => {
        this.props.resendEmail()
        this.setState({
            resendDisabled: true
        });
        const resendTimeOut = setTimeout(
            () => {
                this.setState({ resendDisabled: false })
            }, 2000);
        this.setState({
            resendTimeOut
        })
    }

    handleRefreshStatusClick = (event) => {
        this.props.setUserStatus(this, true);
        this.setState({
            refreshStatusDisabled: true
        });
        const refreshTimeOut = setTimeout(
            () => {
                if (!JSON.parse(localStorage['reduxPersist:user']).isConfirmed) {
                    this.setState({ refreshStatusDisabled: false })
                }
            }, 2000)
        this.setState({
            refreshTimeOut
        })
    }

    componentWillUnmount() {
        if (this.state.refreshTimeOut) {
            clearTimeout(this.state.refreshTimeOut)
        }
        if (this.state.resendTimeOut) {
            clearTimeout(this.state.resendTimeOut)
        }
    }

    render() {
        return (
            <div>
                {this.props.translate('profile.resend.confirm')}
                <IconButton onClick={this.handleRefreshStatusClick} style={buttonStyle} disabled={this.state.refreshStatusDisabled}>
                    <RefreshIcon />
                </IconButton>
                <br /><br />
                {this.props.translate('profile.resend.notReceived')}

                <IconButton onClick={this.handleResendClick} style={buttonStyle} disabled={this.state.resendDisabled}>
                    <Icon />
                </IconButton>
            </div>
        )
    }
}

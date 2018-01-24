import React, { Component } from 'react';
import Icon from 'react-icons/lib/md/flight-takeoff';
import Button from 'material-ui/Button';

const iconStyle = {
    width: "20px",
    height: "20px"
};

export default class Logout extends Component {

    handleClick = (event) => {
        this.props.userLogOut();
        if (this.props.clientType === 'extension') {
            window.browser.runtime.reload();
        } else {
            window.location.reload();
        }
    }

    render() {
        return (
            <div>
                <Button color='secondary' onClick={this.handleClick}>
                    {this.props.translate('home.profile.logout')} &nbsp; <Icon style={iconStyle} />
                </Button>
            </div>
        )
    }
}

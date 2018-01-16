import React, { Component } from 'react';
import Icon from 'material-ui-icons/Clear';
import Button from 'material-ui/Button';

const divStyle = {
    display: 'inline-block',
    verticalAlign: 'top',
}
const buttonStyle = {
    verticalAlign: 'middle',
    height: '30px',
    'padding': 0
}
const iconStyle = {
    height: '30px',
    width: '30px',
};

class HideSearchBar extends Component {


    handleCLick = () => {
        this.props.toggleSearchBar();
        this.props.toggleFocusSearchBar();
    }

    render() {

        return (
            <div style={this.props.divStyle || divStyle}>
                <Button onClick={this.handleCLick} style={buttonStyle}><Icon style={iconStyle} /></Button>
            </div>
        );
    }
}

export default HideSearchBar;
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/icons/CenterFocusStrong';

// import { withStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';;

const graphButtonStyle = {
    color: 'green',
    fontSize: '0.8rem',
    padding: '8px',
    fontWeight: 'bold'
}

const iconStyle = {
    height: '40px',
    width: '40px'
}

export default class GraphButton extends Component {


    componentWillMount() {
        if (this.props.show.graphButtonBlink) {
            this.interval = setInterval(() => {
                this.setState({
                    display: !this.state.display
                });
            }, 200);

            this.timeout = setTimeout(() => {
                clearInterval(this.interval);
                this.setState({
                    display: true
                });
                // this.props.toggleGraphButtonBlink();
            }, 1600);
        }

    }

    componentWillUnmount() {
        if (this.props.show.graphButtonBlink) {
            clearTimeout(this.timeout);
            clearInterval(this.interval);
            this.props.toggleGraphButtonBlink();
        }
    }


    state = { display: true }

    render() {

        const name = this.props.name ? <span><br /> {'(' + this.props.name + ')'}</span> : ""

        return (
            <Button
                style={{
                    ...graphButtonStyle,
                    color: this.state.display ? graphButtonStyle.color : 'rgba(0,0,0,0)'
                }}
                onClick={this.props.handleClick}
            >
                <span>{this.props.translate('graph.seeGraphButton')} {name} </span> &nbsp; &nbsp; <Icon style={iconStyle} />
            </Button>

        )
    }
}



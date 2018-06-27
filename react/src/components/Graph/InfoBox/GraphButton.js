import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Icon from 'react-icons/lib/fa/chevron-circle-right';
// import { withStyles } from 'material-ui/styles';
// import IconButton from 'material-ui/IconButton';
// import Tooltip from 'material-ui/Tooltip';

const graphButtonStyle = {
    color: 'green',
    fontSize: '0.8rem',
    padding: '8px',
    fontWeight: 'bold'
}

const iconStyle = {
    height: '20px',
    width: '30px'
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

        return (
            <Button
                style={{
                    ...graphButtonStyle,
                    color: this.state.display ? graphButtonStyle.color : 'rgba(0,0,0,0)'
                }}
                onClick={this.props.handleClick}
            >
                {this.props.translate('graph.seeGraphButton') + ' (' + this.props.name + ')'} &nbsp;<Icon style={iconStyle} />
            </Button>

        )
    }
}



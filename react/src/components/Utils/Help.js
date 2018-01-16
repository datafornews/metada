import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Icon from './HelpIcon';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Clear from 'material-ui-icons/Clear';


const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit * 4,
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

class HelpIcon extends Component {

    state = {
        open: false,
        anchorEl: null
    }

    button = null;

    handleClickButton = () => {
        this.setState({
            open: true,
            anchorEl: findDOMNode(this.button),
        });
    };

    handleClickClear = () => {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div>
                <Icon
                    ref={node => {
                        this.button = node;
                    }}
                    onClick={this.handleClickButton}
                    style={this.props.iconStyle}
                    />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                >
                    <Typography className={this.props.classes.typography}>{this.props.content}</Typography>
                    {this.props.forceOpen && <Clear onClick={this.handleClickClear}/>}
                </Popover>
            </div>
        )
    }
}

export default withStyles(styles)(HelpIcon);
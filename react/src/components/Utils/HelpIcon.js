import React, { Component } from 'react';
import Icon from 'react-icons/lib/md/help-outline';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';


const styles = theme => ({
    icon: {
        height: '30px',
        width: '30px',
        verticalAlign: 'middle'
    },
    tooltip: {
        opacity: 0.95
    }
});

const titleStyle = {
    fontSize: '1.2em',
    padding: 4,
}

class HelpIcon extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: this.props.forceOpen === undefined ? false : this.props.forceOpen
        }
    }

    
    componentWillMount() {
        if (this.props.forceOpen) {
            setTimeout(() => {
                this.setState({
                    open: false
                })
            }, 1100);
        }
    }
    


    handleClickClear = () => {
        this.setState({
            open: undefined
        })
    }

    render() {

        return (
            <Tooltip
                id={"tooltip-HelpIcon-" + this.props.id}
                title={<div style={titleStyle}>{this.props.content}</div>}
                placement="left"
                style={{ textAlign: 'center', fontSize: '1.2em', color: 'lightgrey', ...this.props.tooltipStyle }}
                leaveDelay={200}
                classes={{ tooltip: this.props.classes.tooltip }}
                open={this.state.open}
                
            >
                <Icon {...this.props.iconProps} onMouseEnter={() => { this.setState({ open: true }) }} onMouseLeave={() => { this.setState({ open: false }) }} />
            </Tooltip>
        )
    }
}

export default withStyles(styles)(HelpIcon);
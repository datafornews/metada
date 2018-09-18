import React, { Component } from 'react';
// import SideElement from './SideElement';
import IconButton from '@material-ui/core/IconButton'
import HighlightOff from '@material-ui/icons/HighlightOff';


const style = {
    fontSize: '0.9rem',
    fontWeight: 200,
    color: 'rgb(100, 100, 100)',
    textAlign: 'center',
    margin: 'auto',
    position: 'absolute',
    bottom: 16
}

class ShiftToScroll extends Component {

    handleClick = () => {
        sessionStorage.shiftToScroll = "false"
        this.setState({
            content: ""
        })
    }

    state = {
        content: ""
    }

    componentWillMount() {

        if (!sessionStorage.shiftToScroll || sessionStorage.shiftToScroll !== "false") {
            const shiftUnicode = '\u21E7'
            const content = (
                <div style={style} id="shiftToScroll">
                    {this.props.translate('graph.sideButtons.shift') + shiftUnicode + this.props.translate('graph.sideButtons.shift2')}
                    &nbsp;
                    {this.props.translate('graph.sideButtons.shift3')}
                    &nbsp;
                    {this.props.translate('graph.sideButtons.shift4')} <IconButton style={{height: 30, width: 30}} onClick={this.handleClick}><HighlightOff /></IconButton>
                </div>);
            this.setState({
                content
            })
        }
    }

    render() {
        return this.state.content
    }
}

export default ShiftToScroll;
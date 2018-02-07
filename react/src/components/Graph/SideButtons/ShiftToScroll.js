import React, { Component } from 'react';
import SideElement from './SideElement';


const style = {
    fontSize: '0.9rem',
    fontWeight: 200,
    color: 'rgba(100, 100, 100, 0.4)',
    textAlign: 'center',
    margin: 'auto',
    position: 'absolute',
    bottom: '0'
}

class ShiftToScroll extends Component {

    render() {

        const shiftUnicode = '\u21E7'

        const content = (
            <div style={style}>
                {this.props.translate('graph.sideButtons.shift') + shiftUnicode + this.props.translate('graph.sideButtons.shift2')}
                <br />
                {this.props.translate('graph.sideButtons.shift3')}
                &nbsp;
                {this.props.translate('graph.sideButtons.shift4')}
            </div>);

        return content
    }
}

export default ShiftToScroll;
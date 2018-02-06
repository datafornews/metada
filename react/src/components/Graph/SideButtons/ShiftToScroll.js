import React, { Component } from 'react';
import SideElement from './SideElement';


const style = {
    fontSize: '0.9rem',
    fontWeight: 200,
    color: 'rgba(100, 100, 100, 0.4)',
    maxWidth: '150px',
    textAlign: 'center',
    position: 'absolute',
    right: '16%',
    top: '40%'
}

class ShiftToScroll extends Component {

    render() {

        const shiftUnicode = '\u21E7'

        const content = (
            <div style={style}>
                {'click ' + this.props.translate('graph.sideButtons.shift') + shiftUnicode + this.props.translate('graph.sideButtons.shift2')}
                <br />
                {this.props.translate('graph.sideButtons.shift3')}
            </div>);

        return content
    }
}

export default ShiftToScroll;
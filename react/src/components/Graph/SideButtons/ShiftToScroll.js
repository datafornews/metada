import React, { Component } from 'react';
import SideElement from './SideElement';


const zoomStyle = {
    fontSize: '0.8rem',
    fontWeight: 400,
    maxWidth: "140px",
    fontStyle: "italic",
}

class ShiftToScroll extends Component {

    render() {

        const title = this.props.translate('graph.sideButtons.shiftTooltip');

        const shiftUnicode = '\u21E7'

        const content = <div style={zoomStyle}>
            {shiftUnicode + this.props.translate('graph.sideButtons.shift')}
        </div>;

        return <SideElement
            id="tooltip-ShiftScroll"
            title={title}
            placement="left"
            content={content}
            onClick={() => { }}
            {...this.props}
        />
    }
}

export default ShiftToScroll;
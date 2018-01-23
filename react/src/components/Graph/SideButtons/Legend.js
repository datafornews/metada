import React, { Component } from 'react';
import Icon from 'material-ui-icons/RadioButtonChecked';
import Filter from 'material-ui-icons/FilterTiltShift';

const colors = {
    m: '#3f51b5',
    c: 'rgb(187, 45, 45)',
    i: 'rgb(1, 41, 71)'
}

const zoomStyle = {
    fontSize: '0.6rem',
    fontWeight: 300,
}

export default class Legend extends Component {
    render() {
        return (
            <div style={{ paddingTop: '10px', fontSize: this.props.clientType === 'extension' ? '0.8rem' : '0.7rem' }}>
                <table style={{ width: "150px" }}>
                    <tbody>
                        <tr>
                            <td><Icon style={{ color: colors['i'] }} /></td>
                            <td>{this.props.translate('graph.sideButtons.legend.i')}</td>
                        </tr>
                        <tr>
                            <td><Icon style={{ color: colors['c'] }} /></td>
                            <td>{this.props.translate('graph.sideButtons.legend.c')}</td>
                        </tr>
                        <tr>
                            <td><Icon style={{ color: colors['m'] }} /></td>
                            <td>{this.props.translate('graph.sideButtons.legend.m')}</td>
                        </tr>
                        <tr>
                            <td><Icon style={{ color: 'green' }} /></td>
                            <td>{this.props.translate('graph.sideButtons.legend.cg')}</td>
                        </tr>
                        <tr>
                            <td><Filter /></td>
                            <td>{this.props.translate('graph.sideButtons.legend.boldText')}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <div style={zoomStyle}>(press shift to zoom in and out)</div>
            </div>
        )
    }
}

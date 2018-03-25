import React, { Component } from 'react';
import Icon from 'material-ui-icons/LabelOutline';
import Filter from 'material-ui-icons/Label';
import SideElement from './SideElement';
import GraphIcon from 'react-icons/lib/fa/chevron-circle-right';

const colors = {
    m: '#3f51b5',
    c: 'rgb(187, 45, 45)',
    i: 'rgb(1, 41, 71)'
}


export default class Legend extends Component {

    render() {

        const title = this.props.translate('graph.sideButtons.legendTooltip');

        let completeGraph = this.props.translate('graph.sideButtons.legend.cg').split(':');
        completeGraph = (<span>
            <span style={{ color: 'green', fontWeight: 500 }}>
                {completeGraph[0]}
            </span>
            : {completeGraph[1].split('@@')[0]} <GraphIcon style={{ color: 'green' }} /> {completeGraph[1].split('@@')[1]}
        </span>);
        let currentGraph = this.props.translate('graph.sideButtons.legend.boldText').split(':');
        currentGraph = <span>
            <span style={{ fontWeight: 500 }}>{currentGraph[0]}</span>
            : {currentGraph[1]}</span>


        const content = (
            <div
                style={
                    {
                        paddingTop: '15px',
                        fontSize: this.props.clientType === 'extension' ? '0.9rem' : '0.8rem'
                    }
                }
                onMouseEnter={() => { this.setState({ open: true }) }}
                onMouseLeave={() => { this.setState({ open: false }) }}
            >
                <h3 style={{ marginTop: 0, textAlign: 'center' }}>Legend:</h3>

                <table style={{ width: "350px", marginBottom: '30px' }}>
                    <tbody>
                        <tr>
                            <td><Icon style={{ width: "40px", color: colors['m'] }} /></td>
                            <th style={{ color: colors['m'] }}>{this.props.translate('graph.sideButtons.legend.m')}</th>
                            <td></td>
                            <td><Icon style={{ width: "40px", color: colors['c'] }} /></td>
                            <th style={{ color: colors['c'] }}>{this.props.translate('graph.sideButtons.legend.c')}</th>
                            <td></td>
                            <td><Icon style={{ width: "40px", color: colors['i'] }} /></td>
                            <th style={{ color: colors['i'] }}>{this.props.translate('graph.sideButtons.legend.i')}</th>
                        </tr>
                    </tbody>
                </table>

                <table style={{ width: "350px" }}>
                    <tbody>
                        <tr>
                            <td><Icon style={{ width: "40px", color: 'green' }} /></td>
                            <td >{completeGraph}</td>
                        </tr>
                        <tr>
                            <td><br /></td>
                        </tr>
                        <tr>
                            <td><Filter style={{ width: "40px", color: 'grey' }} /></td>
                            <td >{currentGraph}</td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );

        return <SideElement
            id="tooltip-Legend"
            title={title}
            placement="bottom"
            content={content}
            onClick={() => { }}
            {...this.props}
        />
    }
}

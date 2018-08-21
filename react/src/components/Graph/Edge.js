import React, { Component } from 'react'

export default class Edge extends Component {
    render() {
        const target = this.props.data.entities.ids[parseInt(this.props.infoBox.data.target, 10)]
        const source = this.props.data.entities.ids[parseInt(this.props.infoBox.data.source, 10)]

        if (!target || !source) {
            return ''
        }
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 62,
                marginTop: this.props.clientType === 'mobile' ? 56 : 8
            }}>
                {source.name} &nbsp;--<span style={{ fontSize: "0.7rem" }}>({this.props.infoBox.data.label})</span>--> &nbsp;{target.name}
            </div>
        )
    }
}

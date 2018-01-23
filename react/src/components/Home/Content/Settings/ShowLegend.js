import React, { Component } from 'react'
import Switch from 'material-ui/Switch';

const labelStyle = {
    float: 'left',
    textAlign: 'left'
}

const switchStyle = {
    float: 'left'
}

const divStyle = {
    display: "flex",
    alignItems: 'center'
}


export default class ShowLegend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.show.legend,
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.show.legend !== this.props.show.legend) {
            this.setState({
                checked: nextProps.show.legend
            })
        }
    }


    handleChange = (event, checked) => {
        if (this.props.show.legend !== checked) {
            this.props.toggleLegend();
        }
        this.setState({ checked });
    };

    render() {
        return (
            <div style={divStyle} >

                <div style={labelStyle}>
                    {this.props.translate('home.settings.showLegend')}
                </div>

                <div style={switchStyle}>
                    <Switch
                        checked={this.state.checked}
                        onChange={this.handleChange}
                        aria-label="checked"
                    />
                </div>

            </ div>
        )
    }
}

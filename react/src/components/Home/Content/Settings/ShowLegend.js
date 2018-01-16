import React, { Component } from 'react'
import Switch from 'material-ui/Switch';
import Grid from 'material-ui/Grid';


const divStyle = {
    margin: '10px 0px',
    display: 'inline-block'
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
                <Grid container spacing={16}>
                    <Grid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
                        {this.props.translate('home.settings.showLegend')}
                    </Grid>
                    <Grid item xs={4}>
                        <Switch
                            checked={this.state.checked}
                            onChange={this.handleChange}
                            aria-label="checked"
                        />
                    </Grid>
                </Grid>
            </ div>
        )
    }
}
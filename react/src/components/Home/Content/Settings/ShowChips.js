import React, { Component } from 'react'
import Switch from 'material-ui/Switch';
import Grid from 'material-ui/Grid';


const divStyle = {
    // margin: '10px 0px',
    display: 'inline-block'
}


export default class ShowChips extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.show.chips,
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.show.chips !== this.props.show.chips) {
            this.setState({
                checked: nextProps.show.chips
            })
        }
    }


    handleChange = (event, checked) => {
        if (this.props.show.chips !== checked) {
            this.props.toggleChips();
        }
        this.setState({ checked });
    };

    render() {
        return (
            <div style={divStyle} >
                <Grid container spacing={0}>
                    <Grid item xs={10} style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>
                        {this.props.translate('home.settings.showChips')}
                    </Grid>
                    <Grid item xs={2}>
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
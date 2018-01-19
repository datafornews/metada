import React, { Component } from 'react';
import Grid from 'material-ui';

class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stats: {}
        };
    }

    
    componentWillMount() {
        const stats = localStorage.stats
        this.setState({
            stats: stats || {}
        })
    }
    


    render() {
        return (
            <Grid container >

            </Grid>
        );
    }
}

export default Stats;
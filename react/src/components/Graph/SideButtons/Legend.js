import React, { Component } from 'react';
import Icon from '@material-ui/icons/LabelOutline';
import Filter from '@material-ui/icons/Label';
import Grid from '@material-ui/core/Grid';
import GraphIcon from 'react-icons/lib/fa/sitemap';

const colors = {
    m: '#3f51b5',
    c: 'rgb(187, 45, 45)',
    i: 'rgb(1, 41, 71)'
}


export default class Legend extends Component {

    render() {

        let completeGraph = this.props.translate('graph.sideButtons.legend.cg').split(':');
        completeGraph = (<span>
            <span style={{ color: 'green', fontWeight: 500 }}>
                {completeGraph[0]}
            </span>
            : {completeGraph[1]}
        </span>);
        let currentGraph = this.props.translate('graph.sideButtons.legend.boldText').split(':');
        currentGraph = <span>
            <span style={{ fontWeight: 500 }}>{currentGraph[0]}</span>
            : {currentGraph[1]}</span>

        let table1Style = { width: "350px" };
        let table2Style = { width: "350px" };
        if (this.props.clientType === 'mobile') {
            table1Style.width = '80%';
            table1Style.margin = '0px auto 30px auto';
            table2Style.width = '80%';
            table2Style.margin = 'auto';
        }

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

                <Grid container justify='space-around' direction="row" spacing={0}>

                    <Grid item >
                        <Grid container alignItems='center'>
                            <Grid xs={5} item><Icon style={{ width: "40px", color: colors['m'] }} /></Grid>
                            <Grid xs={7} item style={{ color: colors['m'] }}>{this.props.translate('graph.sideButtons.legend.m')}</Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Grid container alignItems='center'>
                            <Grid xs={5} item><Icon style={{ width: "40px", color: colors['c'] }} /></Grid>
                            <Grid xs={7} item style={{ color: colors['c'] }}>{this.props.translate('graph.sideButtons.legend.c')}</Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Grid container alignItems='center'>
                            <Grid xs={5} item><Icon style={{ width: "40px", color: colors['i'] }} /></Grid>
                            <Grid xs={7} item style={{ color: colors['i'] }}>{this.props.translate('graph.sideButtons.legend.i')}</Grid>
                        </Grid>
                    </Grid>


                </Grid>

                <div style={{ maxWidth: "500px", margin: "auto" }}>


                    <Grid container direction="row" spacing={0} style={{ marginTop: 40 }}>

                        <Grid item >
                            <Grid container alignItems='center'>
                                <Grid xs={5} item><Filter style={{ width: "40px", color: 'grey' }} /></Grid>
                                <Grid xs={7} item>{currentGraph}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" spacing={0} style={{ marginTop: 40 }}>
                        <Grid item >
                            <Grid container alignItems='center'>
                                <Grid xs={5} item><Icon style={{ width: "40px", color: 'green' }} /></Grid>
                                <Grid xs={7} item >{completeGraph}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div >
        );

        return content
    }
}

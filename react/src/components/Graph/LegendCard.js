import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

import Legend from './SideButtons/Legend';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
    actions: {
        display: 'flex',
        justifyContent: "flex-end"
    }
});

class LegendCard extends Component {


    state = {
        grow: false
    }

    close = () => {
        this.setState({
            grow: false
        })
        this.props.show.legend && this.props.toggleLegend();
        if (!this.props.show.help) {
            setTimeout(this.props.reRenderGraph, 300)
        }
    }


    componentWillMount() {
        if (!this.props.show.legend) {
            this.setState({
                grow: false
            })
        } else {
            setTimeout(() => {
                if (this.props.show.legend) {
                    this.setState({
                        grow: true
                    })
                }
            }, 500)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.show.legend !== nextProps.show.legend) {
            this.setState({
                grow: nextProps.show.legend
            })
        }
    }



    render() {
        const { classes } = this.props;
        const title = this.props.translate('graph.sideButtons.legend.title');



        return (
            <Grow in={this.state.grow}>
                <Card className={classes.card} elevation={24}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            {title}
                        </Typography>
                        <Legend {...this.props} />
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button onClick={this.close} size="small">Ok</Button>
                    </CardActions>
                </Card>
            </Grow>
        );
    }
}


LegendCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LegendCard);
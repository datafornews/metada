import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

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

class HelpCard extends Component {


    state = {
        grow: false
    }

    close = () => {
        this.setState({
            grow: false
        })
        this.props.stopHelp();
        if (!this.props.show.legend){
            setTimeout(this.props.reRenderGraph, 300)
        }
    }


    componentWillMount() {
        if (!this.props.show.help) {
            this.setState({
                grow: false
            })
        } else {
            setTimeout(() => {
                if (this.props.show.help) {
                    this.setState({
                        grow: true
                    })
                }
            }, 500)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.show.help !== nextProps.show.help) {
            this.setState({
                grow: nextProps.show.help
            })
        }
    }



    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <Grow in={this.state.grow}>
                <Card className={classes.card} elevation={24}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            Help
                        </Typography>
                        <Typography variant="subheading" component="h4">
                            Boutons
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="subheading" component="h4">
                            Description Pannel
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button onClick={this.close} size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grow>
        );
    }
}


HelpCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelpCard);
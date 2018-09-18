import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    title: {
        fontWeight: "bolder"
    }
});

class Title extends Component {

    state = { width: 0, height: 0 };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography color='primary' variant={this.state.width > 800 ? "display3" : "display2"} gutterBottom className={classes.title}>
                    {this.props.translate('home.title')}
                </Typography>
                <Typography variant={this.state.width > 800 ? "display2" : "display1"} gutterBottom className={classes.title}>
                {this.props.translate('home.subtitle')}
                </Typography>
            </div>
        )
    }
}

export default withStyles(styles)(Title);
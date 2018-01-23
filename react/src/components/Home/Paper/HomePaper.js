import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

let defaultTypoStyle = {
    fontSize: '0.8rem',
    textAlign: 'justify',
    textJustify: 'auto',
    fontWeight: 200,
    padding: '25px 50px'
};

const typoStyles = {
    'browser': {
        ...defaultTypoStyle,
    },
    'extension': {
        ...defaultTypoStyle
    },
    'mobile': {
        ...defaultTypoStyle,
        padding: '20px'
    }
}

const styles = theme => ({
    root: theme.mixins.gutters({
        padding: 30,
        marginTop: theme.spacing.unit * 3,
        display: 'inline-block',
        marginBottom: '30px'
    }),
});


class HomePaper extends Component {

    render() {

        let browserWidth = navigator.userAgent.toLocaleLowerCase().indexOf('firefox') > -1 ?
            '-moz-available' : '-webkit-fill-available';

        let typoStyle = { ...typoStyles[this.props.clientType] };

        if (this.props.clientType === 'browser') {
            typoStyle.padding = '0px 10%';
        }

        if (this.props.clientType === 'mobile') {
            typoStyle.fontWeight = 400;
        }

        const { classes } = this.props;

        return (
            <Paper style={{ width: browserWidth, margin: "15px auto 0px auto" }} className={classes.root} elevation={4}>
                <Typography type="body1" style={typoStyle} component="div" >
                    {this.props.content}
                </Typography>
            </Paper>
        );

    }
}

export default withStyles(styles)(HomePaper);
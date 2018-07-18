/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
    },
});

class TextFields extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.model[this.props.id] || '',
            visited: false
        };
    }

    handleChange = value => event => {
        this.props.onChange(event.target.value)
        this.setState({
            [value]: event.target.value,
        });
    };

    setVisited = () => {
        this.setState({
            visited: true
        })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.model[this.props.id] !== this.state.value) {
            this.setState({
                value: nextProps.model[this.props.id]
            })
        }
    }


    render() {
        const { classes } = this.props;
        const label = this.props.label;
        const id = this.props.id;
        return (
            <TextField
                id={id}
                label={label}
                className={classes.textField}
                value={this.state.value || ''}
                onChange={this.handleChange('value')}
                onFocus={this.setVisited}
                onBlur={this.props.onBlur}
                margin="normal"
                type={this.props.type || "input"}
                error={(this.props.valid === undefined ? false : !this.props.valid) && this.state.visited}
            />
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
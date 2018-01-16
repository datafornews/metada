import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    primaryLabel: {
        color: '#3f51b5',
    },
    primaryUnderline: {
        '&:hover:not($disabled):before': {
            backgroundColor: '#3f51b5',
        },
    },
    primaryInkbar: {
        '&:after': {
            backgroundColor: '#3f51b5',
        },
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '95%'
    },
    disabled: {
        color: theme.palette.text.disabled,
    }
});

class SimpleSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.model[this.props.id] || '',
        };

    }


    componentWillUpdate(nextProps, nextState) {
        if (this.state.value !== nextState.value) {
            this.setState({
                value: nextProps.model[nextProps.id]
            })
        }
    }


    handleChange = event => {
        this.setState({ value: event.target.value });
        this.props.onChange(event.target.value);
    };

    render() {
        const { classes, options, label, id } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel FormControlClasses={{ focused: classes.primaryLabel }} htmlFor={id}>
                    {label}
                </InputLabel>
                <Select
                    value={this.state.value || ''}
                    onChange={this.handleChange}
                    input={
                        <Input
                            classes={{
                                inkbar: classes.primaryInkbar,
                                underline: classes.primaryUnderline,
                            }}
                            name="valueSelect"
                            id="select-simple"
                            endAdornment={this.props.endAdornment}
                        />}
                >

                    {Object.keys(options).map((v, k) => {
                        return <MenuItem value={options[v]} key={'option-' + k}>{v}</MenuItem>
                    })}
                </Select>
            </FormControl>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
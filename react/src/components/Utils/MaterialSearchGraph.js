import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash'
import Grid from 'material-ui/Grid';

const styles = theme => ({
    container: {
        flexGrow: 1
    },
    textField: {
        width: '100%',
    },
    primaryLabel: {
        color: '#3f51b5',
    },
    primaryUnderline: {
        '&:hover:not($disabled):before': {
            backgroundColor: '#3f51b5',
        },
    },
    primaryUnderlineError: {
        '&:hover:not($disabled):before': {
            backgroundColor: 'red',
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
    primaryInkbarError: {
        '&:after': {
            backgroundColor: 'red',
        },
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '95%'
    },
    disabled: {
        color: theme.palette.text.disabled,
    },
    open: {
        height: 200,
        overflowX: 'hidden',
        overflowY: 'scroll',
        marginBottom: '8px'
    },
    closed: {
        height: 0
    }
});


function renderInput(inputProps) {
    const { classes, autoFocus, value, ref, ...other } = inputProps;

    return (
        <TextField
            autoFocus={autoFocus}
            className={classes.textField}
            value={value}
            inputRef={ref}
            InputLabelProps={{
                FormControlClasses: { focused: classes.primaryLabel }
            }}
            InputProps={{
                classes: {
                    input: classes.input,
                    inkbar: classes.primaryInkbar,
                    underline: classes.primaryUnderline,
                },
                ...other,
            }}
        />
    );
}

function renderSuggestion(params) {
    const { suggestion, index, itemProps, theme, highlightedIndex, selectedItem } = params;
    const isHighlighted = highlightedIndex === index;
    const isSelected = selectedItem === suggestion.label;

    return (
        <Grid item xs={12} key={suggestion.label}>
            <MenuItem
                {...itemProps}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected
                        ? theme.typography.fontWeightMedium
                        : theme.typography.fontWeightRegular,
                    // zIndex: 999,
                    // width: '100%'
                }}
            >
                {suggestion.label}
            </MenuItem>
        </Grid>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children, classes } = options;
    const paper = (
        <Paper
            {...containerProps}
            className={classes.open}
            square
        >
            {children}
        </Paper>);



    return (
        <Grid container spacing={16}>
            <Grid item xs={12}>
                {paper}
            </Grid>
        </Grid>
    );

}

function getSuggestions(suggestions, defaults, inputValue) {
    let count = 0;
    if (!inputValue) {
        return defaults
    }

    return suggestions.filter(suggestion => {
        const keep =
            (!inputValue || suggestion.label.toLowerCase().includes(inputValue.toLowerCase())) &&
            count < 20;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}


class IntegrationAutosuggest extends React.Component {

    shuffleDefaults = () => {
        this.setState({
            defaults: _.sampleSize(this.props.suggestions, 15),
            open: false
        })
    }


    componentWillMount() {
        this.shuffleDefaults();
    }


    componentWillUpdate(nextProps, nextState) {
        if (!(nextState && this.state)) {
            return
        }
        if (nextState.open === false && this.state.open) {
            this.shuffleDefaults();
        }
    }

    handleStateChange = (state, v) => {
        if (state.isOpen !== undefined) {
            this.setState({
                open: state.isOpen
            })
        }
    }


    render() {
        const { classes, theme, onChange, onInputValueChange, placeholder, suggestions, propsValue } = this.props;
        return (
            <div style={{ width: '100%' }}>
                <Downshift
                    onChange={onChange}
                    onStateChange={this.handleStateChange}
                    onInputValueChange={onInputValueChange}
                    itemToString={i => { return i == null ? '' : String(i) }}
                    render={
                        ({
                        getInputProps,
                            getItemProps,
                            isOpen,
                            inputValue,
                            selectedItem,
                            highlightedIndex,
                    }) => {
                            return (
                                <div className={classes.container}>
                                    {renderInput({
                                        ...getInputProps({
                                            classes,
                                            placeholder: placeholder,
                                            id: 'integration-downshift',

                                        }),
                                        value: propsValue
                                    }
                                    )}
                                    {isOpen
                                        ? renderSuggestionsContainer({
                                            children: getSuggestions(suggestions, this.state.defaults, inputValue).map((suggestion, index) =>
                                                renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    theme,
                                                    itemProps: getItemProps({ item: suggestion.label }),
                                                    highlightedIndex,
                                                    selectedItem
                                                }),
                                            ),
                                            classes
                                        })
                                        : null}
                                </div>
                            )
                        }}
                />
            </div>
        );
    }
}


IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(IntegrationAutosuggest);
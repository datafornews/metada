import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { MenuItem } from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'

function renderInput(inputProps) {
    const { classes, autoFocus, value, ref, ...other } = inputProps;

    return (
        <TextField
            autoFocus={autoFocus}
            className={classes.textField}
            value={value}
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input,
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
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected
                    ? theme.typography.fontWeightMedium
                    : theme.typography.fontWeightRegular,
                zIndex: 999
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;
    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
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
            count < 5;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

const styles = {
    container: {
        flexGrow: 1,
        height: 200,
    },
    textField: {
        width: '100%',
    },
};

class IntegrationAutosuggest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            defaults: _.sampleSize(this.propssuggestions, 5)
        }
    }
    
    shuffleDefaults = () => {
        this.setState({
            defaults: _.sampleSize(this.propssuggestions, 5)
        })
    }

    render() {
        const { classes, theme, onChange, placeholder, suggestions } = this.props;

        return (
            <Downshift
                onChange={onChange}
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
                                {renderInput(
                                    getInputProps({
                                        classes,
                                        placeholder: placeholder,
                                        id: 'integration-downshift',
                                    }),
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
                                                selectedItem,
                                            }),
                                        ),
                                    })
                                    : null}
                            </div>
                        )
                    }}
            />
        );
    }
}


IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(IntegrationAutosuggest);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    container: {
        display: 'inline-block',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit,
    },
});

class LanguageSelect extends React.Component {

    handleChange = name => event => {
        const languageCode = event.target.value;
        this.props.setActiveLanguage(languageCode);
        localStorage.setItem('activeLanguage', languageCode);
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel className={classes.inputLabel} htmlFor="age-simple">
                        {this.props.translate('home.settings.languageButton')}
                    </InputLabel>
                    <Select
                        value={this.props.currentLanguage}
                        onChange={this.handleChange('lang')}
                        input={<Input id="set-language" />}
                        style={{ fontSize: '0.8rem' }}
                    >
                        <MenuItem style={{ fontSize: '0.8rem' }} value='en'>English</MenuItem>
                        <MenuItem style={{ fontSize: '0.8rem' }} value='fr'>Français</MenuItem>
                    </Select>
                </FormControl>

            </form>
        );
    }
}

LanguageSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LanguageSelect);
import React from 'react';
import Select, { createFilter } from 'react-select';
import logGraph from '../../utils/logGraph';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  container: {
    width: '80%',
    height: 'auto',
    margin: 'auto'
  }
});




class SearchBar extends React.Component {

  logChange = (val) => {
    if (val && val.id) {
      if (this.props.data.idSet.indexOf(parseInt(val.id, 10)) > -1) {
        if (this.props.history.location.pathname !== '/graph/' + val.id) {
          if (this.props.show.about) {
            this.props.toggleAbout();
          }
          this.props.updateEntityInfoBox(val.id);

          logGraph(val.id);
          this.props.history.push(`/graph/${val.id}`);
        }
      }
    }
  }

  render() {
    const { classes, controlStyle } = this.props;

    const colourStyles = {
      control: styles => ({ ...styles, ...controlStyle }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isDisabled
            ? null
            : isSelected ? 'green' : isFocused ? 'rgba(50, 50, 50, 0.2)' : null,
          color: isDisabled
            ? '#ccc'
            : isSelected
              ? 'black'
              : this.props.theme.palette.secondary.main,
          cursor: isDisabled ? 'not-allowed' : 'default',
        };
      },
      input: styles => ({ ...styles }),
      placeholder: styles => ({ ...styles }),
      singleValue: (styles, { data }) => ({ ...styles }),
    };

    return (

      <Select
        className={classes.container}
        isClearable
        isSearchable
        options={this.props.data.optionsData}
        onChange={this.logChange}
        filterOption={createFilter({
          ignoreCase: true,
          ignoreAccents: true,
          trim: true,
          matchFromStart: 'any'
        })}
        styles={colourStyles}
        placeholder={this.props.translate('search.searchPlaceholder')}
        autoFocus={!this.props.preventAutofocus}
        ref={(select) => { this.select = select; }}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(SearchBar);
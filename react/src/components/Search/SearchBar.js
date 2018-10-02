import React from 'react';
import Select, { createFilter } from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = theme => ({
  container: {
    width: '80%',
    height: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'
  }
});




class SearchBar extends React.Component {

  state = {
    menuIsOpen: undefined
  }

  logChange = (val) => {
    if (val && val.id) {
      if (this.props.data.idSet.indexOf(parseInt(val.id, 10)) > -1) {
        if (this.props.history.location.pathname !== '/graph/' + val.id) {
          this.props.updateEntityInfoBox(val.id);
          this.props.history.push(`/graph/${val.id}`);
          this.closeMenuAndBlur();
        }
      }
    }
  }

  closeMenuAndBlur = () => {
    this.setState({
      menuIsOpen: false
    });
    this.select.blur();
  }

  openMenu = () => {
    this.setState({
      menuIsOpen: true
    });
  }


  render() {
    const { classes, controlStyle, match, isGraph } = this.props;

    const currentGraphId = isGraph ? match.params.entityId : "";

    const colourStyles = {
      control: (styles, {isFocused}) => {
        return { ...styles, ...controlStyle }
      },
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isDisabled
            ? null
            : isSelected || data.id === currentGraphId ? 'rgba(180, 180, 180, 0.2)' : isFocused ? 'rgba(50, 50, 50, 0.2)' : null,
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
      <ClickAwayListener onClickAway={this.closeMenuAndBlur} >
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
          ref={(select) => { this.select = select; }}
          menuIsOpen={this.state.menuIsOpen}
          onFocus={this.openMenu}
        />
      </ ClickAwayListener>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SearchBar);
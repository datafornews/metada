import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import HideSearchBar from './HideSearchBar';
import logGraph from '../../utils/logGraph';

const selectStyle = {
  borderWidth: '1px',
  borderRadius: '0px',
  zIndex: 999,
  margin: 'auto',
  marginBottom: '15px',
  fontSize: '1rem'
};

var searchBarDivStyleDefault = {
  marginBottom: '15px',
  textAlign: 'center',
};

class SearchBar extends React.Component {

  logChange = (val) => {
    if (val && val.id) {
      if (this.props.data.idSet.indexOf(parseInt(val.id, 10)) > -1) {
        if (this.props.location.pathname !== '/graph/' + val.id) {
          if (this.props.show.about) {
            this.props.toggleAbout();
          }
          this.props.show.searchBar && ['/', '/search'].indexOf(this.props.location.pathname) > -1 && this.props.closeAll();
          this.props.updateEntityInfoBox(val.id);

          logGraph(val.id);
          this.props.history.push(`/graph/${val.id}`);
        }
      }
    }
  }


  componentWillUpdate(nextProps, nextState) {
    if (nextProps.focus !== this.props.focus && this.props.history.location.pathname.indexOf('graph') > -1) {
      console.log('focus');
      this.select.focus()
    }
  }


  render() {

    let searchBarDivStyle = { ...searchBarDivStyleDefault };

    if (this.props.location.pathname === '/') {
      searchBarDivStyle.marginTop = '24px';
    } else {
      searchBarDivStyle.width = this.props.width;
      searchBarDivStyle.margin = 'auto';

    }

    const selectDivStyle = {
      ...selectStyle
    };

    return (
      <div style={searchBarDivStyle}>
        <div style={selectDivStyle}>
          <Select
            name="form-field-name"
            value="one"
            options={this.props.data.optionsData}
            onChange={this.logChange}
            ignoreCase
            ignoreAccents
            style={selectStyle}
            menuStyle={{ backgroundColor: 'rgba(204, 172, 149, 0.35)' }}
            placeholder={this.props.translate('search.searchPlaceholder')}
            arrowRenderer={() => null}
            autoBlur
            clearable={false}
            autofocus={!this.props.preventAutofocus}
            ref={(select) => { this.select = select; }}
          />
        </div>
        {!this.props.hideButton && <HideSearchBar {...this.props} />}
      </div>
    );
  }
}

export default SearchBar;

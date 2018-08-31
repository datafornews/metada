import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import logGraph from '../../utils/logGraph';

const selectStyle = {
  // borderWidth: '1px',
  // borderRadius: '0px',
  // zIndex: 999,
  // margin: 'auto',
  // marginBottom: '15px',
  // fontSize: '0.8rem',
  // width:'60%'
};

var searchBarDivStyleDefault = {
  margin: 'auto',
  // marginTop: '15px',
  // textAlign: 'center',
  // float: 'right'
};

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
          this.props.show.sideButtons && this.props.toggleSideButtons();
          this.props.history.push(`/graph/${val.id}`);
        }
      }
    }
  }


  // componentWillUpdate(nextProps, nextState) {
  //   if (nextProps.focus !== this.props.focus && this.props.history.location.pathname.indexOf('graph') > -1) {
  //     console.log('focus');
  //     this.select.focus()
  //   }
  // }


  render() {

    let searchBarDivStyle = { ...searchBarDivStyleDefault };

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
            menuStyle={{ backgroundColor: 'rgba(204, 172, 149, 0.35)', zIndex: 1000 }}
            placeholder={this.props.translate('search.searchPlaceholder')}
            arrowRenderer={() => null}
            autoBlur
            clearable={false}
            autoFocus={!this.props.preventAutofocus}
            ref={(select) => { this.select = select; }}
          />
        </div>
        {/* {!this.props.hideButton && <HideSearchBar {...this.props} />} */}
      </div>
    );
  }
}

export default SearchBar;
import React, { Component } from 'react';
import SearchBar from '../../../Search/SearchBar';
import SearchBar2 from '../../../Search/SearchBarV2';
import Waiting from '../../../Waiting';


const searchBarDivStyle = {
    marginTop: '24px'
};

class HomeSearchBar extends Component {
    render() {
        return this.props.dataIsAvailable
            ?
            this.props.show.searchBar
                ?
                (<div style={searchBarDivStyle}>
                    {/* <SearchBar {...this.props} hideButton /> */}
                    <SearchBar2 {...this.props} />

                </div>)
                :
                ''
            :
            <Waiting clientType={this.props.clientType} translate={this.props.translate} toTranslate='home.loadingData' />
    }
}


export default HomeSearchBar;
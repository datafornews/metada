import React, { Component } from 'react'
import MaterialSearchGraph from './MaterialSearchGraph'
import HideSearchBar from './HideSearchBar';
import logGraph from '../../utils/logGraph';


const selectStyle = {
    borderWidth: '1px',
    borderRadius: '0px',
    zIndex: 999,
    margin: 'auto',
    marginBottom: '15px'
};

export default class MaterialSearchBar extends Component {

    logChange = (val) => {
        let entity
        if (val) {
            entity = this.props.data.entities.names[val]
        }
        if (entity) {
            if (this.props.location.pathname !== '/graph/' + entity.id) {
                if (this.props.show.about) {
                    this.props.toggleAbout();
                }
                this.props.show.searchBar && ['/', '/search'].indexOf(this.props.location.pathname) > -1 && this.props.closeAll();
                this.props.updateEntityInfoBox(entity.id);

                logGraph(val.id);
                this.props.history.push(`/graph/${entity.id}`);
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

        let searchBarDivStyle = {
            marginBottom: '15px',
            textAlign: 'center',
        };

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
                    <MaterialSearchGraph
                        suggestions={this.props.data.optionsData}
                        onChange={this.logChange}
                        ref={(select) => { this.select = select; }}
                        placeholder={this.props.translate('search.searchPlaceholder')}
                    />
                </div>
                {!this.props.hideButton && <HideSearchBar {...this.props} divStyle={{width:'100%', left: 0, top: 50, position: 'absolute'}}/>}
            </div >
        )
    }
}

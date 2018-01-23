function show(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_ABOUT':
            return {
                ...state,
                about: !state.about
            };
        case 'TOGGLE_STATS':
            return {
                ...state,
                stats: !state.stats
            };
        case 'TOGGLE_SEARCH':
            return {
                ...state,
                searchBar: !state.searchBar
            };
        case 'TOGGLE_CONTACT':
            return {
                ...state,
                contact: !state.contact
            };
        case 'TOGGLE_SETTINGS':
            return {
                ...state,
                settings: !state.settings
            };
        case 'TOGGLE_EXTENSION':
            return {
                ...state,
                extension: !state.extension
            }
        case 'TOGGLE_HOWITWORKS':
            return {
                ...state,
                howItWorks: !state.howItWorks
            }
        case 'TOGGLE_FOCUSSEARCHBAR':
            return {
                ...state,
                focusSearchBar: !state.focusSearchBar
            }
        case 'TOGGLE_SIDEBUTTONS':
            return {
                ...state,
                sideButtons: !state.sideButtons
            }
        case 'TOGGLE_LEGEND':
            return {
                ...state,
                legend: !state.legend
            }
        case 'CLOSE_ALL':
            let newState = {
                ...state
            }
            for (var i in state) {
                if (i !== 'legend'){
                    newState[i] = false;
                }
            }
            return newState;
        case 'TOGGLE_FTUX':
            return {
                ...state,
                ftux: !state.ftux
            };

        default:
            return state;
    }
}

export default show;
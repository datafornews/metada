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
                sideButtons: !state.sideButtons,
                searchBar: false
            }
        case 'TOGGLE_LEGEND':
            return {
                ...state,
                legend: !state.legend
            }
        case 'TOGGLE_CHIPS':
            return {
                ...state,
                chips: !state.chips
            }
        case 'CLOSE_ALL':
            let newState = {
                ...state
            }
            const dont_close = ['legend', 'chips', 'help'];
            for (var i in state) {
                if (dont_close.indexOf(i) === -1) {
                    newState[i] = false;
                }
            }
            return newState;
        case 'STOP_HELP':
            return {
                ...state,
                help: false
            };
        case 'START_HELP':
            return {
                ...state,
                help: true
            };
        case 'TOGGLE_DRAWER':
            return {
                ...state,
                drawer: !state.drawer
            };
        case 'TOGGLE_ISSUE':
            return {
                ...state,
                issue: !state.issue
            };
        case 'TOGGLE_GRAPH_BUTTON_BLINK':
            return {
                ...state,
                graphButtonBlink: !state.graphButtonBlink
            }

        default:
            return state;
    }
}

export default show;
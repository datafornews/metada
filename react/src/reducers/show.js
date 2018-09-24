function show(state = false, action) {
    // console.log('action.type :', action.type);
    switch (action.type) {
        case 'TOGGLE_STATS':
            return {
                ...state,
                stats: action.val != null ? action.val : !state.stats
            };
        case 'TOGGLE_CONTRIBUTE':
            return {
                ...state,
                contribute: action.val != null ? action.val : !state.contribute
            };
        case 'TOGGLE_SEARCH':
            return {
                ...state,
                searchBar: action.val != null ? action.val : !state.searchBar
            };
        case 'TOGGLE_CONTACT':
            return {
                ...state,
                contact: action.val != null ? action.val : !state.contact
            };
        case 'TOGGLE_SETTINGS':
            return {
                ...state,
                settings: action.val != null ? action.val : !state.settings
            };
        case 'TOGGLE_EXTENSION':
            return {
                ...state,
                extension: action.val != null ? action.val : !state.extension
            }
        case 'TOGGLE_HOWITWORKS':
            return {
                ...state,
                howItWorks: action.val != null ? action.val : !state.howItWorks
            }
        case 'TOGGLE_FOCUSSEARCHBAR':
            return {
                ...state,
                focusSearchBar: action.val != null ? action.val : !state.focusSearchBar
            }
        case 'TOGGLE_LEGEND':
            return {
                ...state,
                legend: action.val != null ? action.val : !state.legend
            }
        case 'TOGGLE_CHIPS':
            return {
                ...state,
                chips: action.val != null ? action.val : !state.chips
            }
        case 'TOGGLE_DRAWER':
            return {
                ...state,
                drawer: action.val != null ? action.val : !state.drawer
            };
        case 'TOGGLE_ISSUE':
            return {
                ...state,
                issue: action.val != null ? action.val : !state.issue
            };
        case 'TOGGLE_DOUBLE_CLICK_HELP':
            return {
                ...state,
                doubleClickHelp: action.val != null ? action.val : !state.doubleClickHelp
            };
        case 'TOGGLE_LONG_CLICK_HELP':
            return {
                ...state,
                longClickHelp: action.val != null ? action.val : !state.longClickHelp
            };
        case 'TOGGLE_HELP_SUGGESTION':
            return {
                ...state,
                helpSuggestion: action.val != null ? action.val : !state.helpSuggestion
            };
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
        case 'CLOSE_ALL':
            let newState = {
                ...state
            }
            const dont_close = ['legend', 'chips', 'help', 'doubleClickHelp', 'longClickHelp'];
            for (var i in state) {
                if (dont_close.indexOf(i) === -1) {
                    newState[i] = false;
                }
            }
            return newState;

        default:
            return state;
    }
}

export default show;
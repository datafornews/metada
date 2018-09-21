const defaultState = {
    data: {},
    dataIsAvailable: false,
    isRehydrated: false,
    show: {
        help: false,
        doubleClickHelp: true,
        longClickHelp: true,
        helpSuggestion: true
    },
    currentDisplay: -1,
    infoBox: {
        type: '',
        data: []
    }
};

export default defaultState;
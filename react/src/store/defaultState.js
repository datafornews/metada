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
        entity: null,
        share: null
    }
};

export default defaultState;
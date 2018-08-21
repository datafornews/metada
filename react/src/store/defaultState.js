const defaultState = {
    data: {},
    dataIsAvailable: false,
    isRehydrated: false,
    show: {
        howItWorks: true,
        legend: true,
        chips: true,
        help: true,
        graphButtonBlink: true,
        doubleClickHelp: true,
        longClickHelp: true
    },
    currentDisplay: -1,
    infoBox: {
        type: '',
        data: []
    }
};

export default defaultState;
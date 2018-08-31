const defaultState = {
    data: {},
    dataIsAvailable: false,
    isRehydrated: false,
    show: {
        howItWorks: true,
        legend: true,
        chips: true,
        help: false,
        graphButtonBlink: true,
        doubleClickHelp: true,
        longClickHelp: true,
        navigationSnackbar: true
    },
    currentDisplay: -1,
    infoBox: {
        type: '',
        data: []
    }
};

export default defaultState;
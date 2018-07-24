const defaultState = {
    data: {},
    dataIsAvailable: false,
    show: {
        howItWorks: true,
        legend: true,
        chips: true,
        help: true,
        graphButtonBlink: true
    },
    currentDisplay: -1,
    infoBox: {
        type: '',
        data: []
    }
};

export default defaultState;
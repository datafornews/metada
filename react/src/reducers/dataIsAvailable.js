function dataIsAvailable(state = [], action) {
    switch (action.type) {
        case 'MAKE_DATA_AVAILABLE':
            return true;
        default:
            return state;
    }
}

export default dataIsAvailable;
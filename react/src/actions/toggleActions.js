export function toggle(value) {
    return {
        type: 'TOGGLE_' + value.toUpperCase()
    }
}

export function toggleSearchBar() {
    return {
        type: 'TOGGLE_SEARCH'
    };
}

export function toggleStats() {
    return {
        type: 'TOGGLE_STATS'
    };
}

export function toggleHowItWorks() {
    return {
        type: 'TOGGLE_HOWITWORKS'
    };
}

export function toggleAbout() {
    return {
        type: 'TOGGLE_ABOUT'
    };
}

export function toggleContact() {
    return {
        type: 'TOGGLE_CONTACT'
    };
}

export function toggleSettings() {
    return {
        type: 'TOGGLE_SETTINGS'
    };
}

export function toggleExtension() {
    return {
        type: 'TOGGLE_EXTENSION'
    };
}

export function toggleSideButtons() {
    return {
        type: 'TOGGLE_SIDEBUTTONS'
    };
}

export function toggleLegend() {
    return {
        type: 'TOGGLE_LEGEND'
    };
}

export function toggleChips() {
    return {
        type: 'TOGGLE_CHIPS'
    };
}

export function toggleContrib() {
    return {
        type: 'TOGGLE_CONTRIB'
    };
}

export function toggleEditGraph() {
    return {
        type: 'TOGGLE_EDITGRAPH'
    }
}

export function toggleFtux() {
    return {
        type: 'TOGGLE_FTUX'
    };
}

export function toggleFocusSearchBar() {
    return {
        type: 'TOGGLE_FOCUSSEARCHBAR'
    };
}

export function toggleGraphButtonBlink() {
    return {
        type: 'TOGGLE_GRAPH_BUTTON_BLINK'
    };
}

export function closeAll() {
    return {
        type: 'CLOSE_ALL'
    };
}
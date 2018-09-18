export function toggle(value) {
    return {
        type: 'TOGGLE_' + value.toUpperCase()
    }
}

export function toggleSearchBar(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_SEARCH',
        val
    };
}

export function toggleChips(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_CHIPS',
        val
    };
}

export function toggleStats(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_STATS',
        val
    };
}

export function toggleHowItWorks(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_HOWITWORKS',
        val
    };
}

export function toggleAbout(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_ABOUT',
        val
    };
}

export function toggleContact(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_CONTACT',
        val
    };
}

export function toggleSettings(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_SETTINGS',
        val
    };
}

export function toggleContribute(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_CONTRIBUTE',
        val
    };
}

export function toggleExtension(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_EXTENSION',
        val
    };
}

export function toggleSideButtons(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_SIDEBUTTONS',
        val
    };
}

export function toggleLegend(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_LEGEND',
        val
    };
}

export function toggleIssue(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_ISSUE',
        val
    };
}


export function toggleDrawer(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_DRAWER',
        val
    };
}

export function toggleDoubleClickHelp(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_DOUBLE_CLICK_HELP',
        val
    };
}
export function toggleLongClickHelp(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_LONG_CLICK_HELP',
        val
    };
}

export function toggleFocusSearchBar(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_FOCUSSEARCHBAR',
        val
    };
}
export function toggleNavigationSnackbar(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    if (val === false){
        localStorage['navigationSnackbar'] = '1'
    }
    return {
        type: 'TOGGLE_NAVIGATION_SNACKBAR',
        val
    };
}

export function toggleGraphButtonBlink(val = null) {
    if (typeof (val) !== typeof (true)) {
        val = null;
    }
    return {
        type: 'TOGGLE_GRAPH_BUTTON_BLINK',
        val
    };
}

export function stopHelp() {
    return {
        type: 'STOP_HELP'
    };
}

export function startHelp() {
    return {
        type: 'START_HELP'
    };
}

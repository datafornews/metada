window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();


fetchData();
console.log('Background Analytics')
$(function () {
    localStorage["newProfile"] = false;
    console.log('Running Background JS');

    window.browser.tabs.onUpdated.addListener(function (onglet) {
        if (!isNaN(onglet)) {
            window.browser.tabs.query({ active: true, lastFocusedWindow: true },
                function (array_of_tabs) {
                    var tab = array_of_tabs[0];
                    if (tab && sessionStorage['currentTabUrl'] !== tab.url) {
                        sessionStorage['currentTabUrl'] = tab.url;
                        console.log('Checking for stats');
                        log_stats(tab)
                    }
                    if (tab && tab.id === onglet
                        && sessionStorage['tab_' + tab.id + '_previous'] !== tab.url) {
                        sessionStorage['tab_' + tab.id + '_previous'] = tab.url;
                        log_tab(tab);
                        count_tabs()
                    }
                });
        };
    });

    window.browser.tabs.onCreated.addListener(function (tab) {
        sessionStorage['tab_' + tab.id + '_previous'] = tab.url;
        log_tab(tab);
        count_tabs()
    });


    window.browser.tabs.onRemoved.addListener(function (tab) {
        count_tabs();
        if (localStorage['numberTabsOpen'] === "0") {
            localStorage['currentTabUrl'] = "";
            localStorage['currentTabTitle'] = ""
        }
    });

});
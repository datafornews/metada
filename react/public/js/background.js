fetchData();
console.log('Background Analytics')
$(function () {
    localStorage["newProfile"] = false;
    console.log('Running Background JS');

    chrome.tabs.onUpdated.addListener(function (onglet) {
        if (!isNaN(onglet)) {
            chrome.tabs.query({ active: true, lastFocusedWindow: true },
                function (array_of_tabs) {
                    var tab = array_of_tabs[0];
                    if (tab && sessionStorage['currentTabUrl'] !== tab.url ) {
                        sessionStorage['currentTabUrl'] = tab.url;
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

    chrome.tabs.onCreated.addListener(function (tab) {
        sessionStorage['tab_' + tab.id + '_previous'] = tab.url;
        log_tab(tab);
        count_tabs()
    });


    chrome.tabs.onRemoved.addListener(function (tab) {
        count_tabs();
        if (localStorage['numberTabsOpen'] === "0") {
            localStorage['currentTabUrl'] = "";
            localStorage['currentTabTitle'] = ""
        }
    });

});
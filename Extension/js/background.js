window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();


fetchData();
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-110264616-1']);
_gaq.push(['_trackPageview']);
(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
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
export function check_website(data, url) {
    var e;
    for (var entity in data.entities.ids) {
        e = data.entities.ids[entity];
        if (e.website) {
            var website = parse_url(e.website);
            if (url.indexOf(website) !== -1) {
                console.log('Found ' + website + ' in ' + url + ' leading to entity : ' + e.name);
                return e
            }
        }
    }
    return false
}

function parse_url(url) { //moved
    var parser = document.createElement('a');
    parser.href = url;
    var new_url = parser.hostname;
    if (new_url.indexOf("www.") === 0) {
        new_url = new_url.substring(4, new_url.length)
    }
    return new_url
}

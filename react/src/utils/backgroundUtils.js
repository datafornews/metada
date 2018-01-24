export function check_website(data, url) {
    var e, website, entity;
    var entities = [];
    for (entity in data.entities.ids) {
        e = data.entities.ids[entity];
        if (e.website) {
            website = parse_url(e.website);
            if (url.indexOf(website) !== -1) {
                entities.push(e);
            }
        }
    }

    if (entities.length > 1) {
        for (entity of entities) {
            if (entity.website) {
                website = parse_long_url(url);
                if (entity.website.indexOf(website) !== -1) {
                    console.log('Found ' + website + ' in ' + url + ' leading to entity : ' + entity.name);
                    return entity;
                }
            }
        }
    } else if (entities.length === 1) {
        entity = entities[0];
        console.log('Found ' + website + ' in ' + url + ' leading to entity : ' + entity.name);
        return entity;
    }

    return null;
}


function parse_url(url) {
    var parser = document.createElement('a');
    parser.href = url;
    var new_url = parser.hostname;
    if (new_url.indexOf("www.") === 0) {
        new_url = new_url.substring(4, new_url.length)
    }
    return new_url
}

function parse_long_url(url) {
    var parser = document.createElement('a');
    parser.href = url;
    var new_url = parser.hostname;
    var path_name = parser.pathname;
    path_name = path_name.split('/')[1];

    if (new_url.indexOf("www.") === 0) {
        new_url = new_url.substring(4, new_url.length)
    }
    return path_name.length <= 1 ? new_url : new_url + '/' + path_name
}
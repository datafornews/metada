export function check_website(data, url) {
    var e, website, entity, entityId, simplifiedCurrentUrl;
    var foundEntities = [];
    for (entityId in data.entities.ids) {
        e = data.entities.ids[entityId];
        if (e.website) {
            website = parse_url(e.website);
            if (url.indexOf(website) !== -1) {
                foundEntities.push(e);
            }
        }
    }

    // console.log(foundEntities);

    if (foundEntities.length > 1) {
        let parser;
        let shortest = {
            pathName: ' '.repeat(100),
            entity: null
        };

        for (entity of foundEntities) {
            if (entity.website) {

                parser = document.createElement('a');
                parser.href = entity.website;
                if (parser.pathname.length < shortest.pathName.length) {
                    shortest = {
                        pathName: parser.pathname,
                        entity: entity
                    }
                }


                simplifiedCurrentUrl = parse_long_url(url);
                // console.log('Parsed URL', simplifiedCurrentUrl, entity.website);
                if (entity.website.indexOf(simplifiedCurrentUrl) !== -1) {
                    console.log('Found ' + simplifiedCurrentUrl + ' in ' + url + ' leading to entity : ' + entity.name);
                    return entity;
                }
            }
        }
        if (shortest.entity) {
            console.log('Found ' + shortest.entity.website + ' in ' + url + ' leading to entity : ' + shortest.entity.name);
        }
        return shortest.entity
    } else if (foundEntities.length === 1) {
        entity = foundEntities[0];
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
import md5 from 'md5';

import wtf from 'wtf_wikipedia';

export default async function (component, entity) {

    let localImage = localStorage.getItem('image_' + entity.id);
    if (localImage !== null) {
        component.setState({
            image: localImage
        })
        return
    }
    if (!entity.wiki_link) {
        noImage(component);
        return;
    }
    const lang = entity.wiki_link.split('://')[1].split('.')[0];
    const wiki = entity.wiki_link.split('/');
    const pageTitle = wiki[wiki.length - 1];

    let escapedTitle = pageTitle.indexOf('%') > -1 ? pageTitle : encodeURIComponent(pageTitle);
    escapedTitle = escapedTitle.replace('%25C3%2589', 'E').replace("'", '%27');

    let queryUrl = "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&titles=";
    queryUrl += escapedTitle + "&sites=enwiki|frwiki&origin=*";

    // console.log('Wikidata URL', queryUrl);

    try {
        const response = await fetch(queryUrl);
        const data = await response.json();
        // console.log(entity.name, data);
        if (data.entities) {
            const wikiEntities = data.entities;
            // console.log('Wikientities', wikiEntities);

            let key, str;
            for (let k of Object.keys(wikiEntities)) {
                str = '' + k;
                if (str.length > 3) {
                    key = k;
                    if (wikiEntities[k].descriptions
                        &&
                        wikiEntities[k].descriptions.en
                        &&
                        wikiEntities[k].descriptions.en.value !== "Wikipedia disambiguation page"
                        &&
                        wikiEntities[k].descriptions.en.value !== "Wikimedia disambiguation page") {
                        break;
                    }
                }
            }

            // console.log('Key', key);

            if (key === undefined) {
                noImage(component);
                return;
            }

            const wikiEntity = wikiEntities[key];
            // console.log('wikiEntity', wikiEntity);
            if (wikiEntity) {

                const imageClaims = ["P154", "P18"];
                let imageAddress;
                // console.log(wikiEntity);

                for (const claim of imageClaims) {
                    if (Object.keys(wikiEntity.claims).indexOf(claim) > -1) {
                        const c = wikiEntity.claims[claim][0];

                        if (c.mainsnak && c.mainsnak.datavalue && c.mainsnak.datavalue.value) {
                            imageAddress = replaceAll(c.mainsnak.datavalue.value, " ", "_");
                            const md = md5(imageAddress)
                            imageAddress = `https://upload.wikimedia.org/wikipedia/commons/${md[0]}/${md[0] + md[1]}/${imageAddress}`;
                            // localStorage['image_' + entity.id] = imageAddress;
                            component.setState({
                                image: imageAddress
                            });
                            return
                        }
                    }
                }

                const pageIdRequest = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${escapedTitle}&format=json&origin=*`
                const pageIdResponse = await fetch(pageIdRequest);
                const data = await pageIdResponse.json();
                console.log(data);
                if (data && data.query && data.query.pages) {
                    const page = Object.keys(data.query.pages)[0];
                    wtf.fetch(parseInt(page, 10), lang).then(doc => {
                        const info = doc.infobox(0).data;
                        const images = ["logo", "image"];
                        console.log(entity.name, info);
                        for (const img of images) {
                            if (Object.keys(info).indexOf(img) > -1) {
                                const name = replaceAll(info[img].data.text, " ", "_");
                                console.log(name);
                                const mdi = md5(name)
                                imageAddress = `https://upload.wikimedia.org/wikipedia/${lang}/${mdi[0]}/${mdi[0] + mdi[1]}/${name}`;
                                // localStorage['image_' + entity.id] = imageAddress;
                                component.setState({
                                    image: imageAddress
                                });
                                return
                            }
                        }
                    }).catch(noImage)
                }



                noImage(component);
            }
        } else {
            noImage(component);
        }
    } catch (e) {
        console.log('Get Wiki Error', e)
        noImage(component);
    }


};

function noImage(component) {
    console.log('noImage')
    return
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
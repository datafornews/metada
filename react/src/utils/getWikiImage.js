import md5 from 'md5';

import wtf from 'wtf_wikipedia';

export default async function (component, entity) {

    if (!component || !entity || component.prevent) {
        noImage(component);
        return
    }

    // console.log("Trying to get image for ", entity.name);

    let imageAddress;
    let localImage = localStorage.getItem('image_' + entity.id);
    if (localImage !== null) {
        try {
            const urlData = JSON.parse(localImage);
            component.setState({
                image: urlData.url
            })
            // console.log(`Using existing address (${entity.name})`)
            const weekInMilliSecs = 1000 * 60 * 60 * 24;
            const now = new Date().getTime();
            if (now - Date.parse(urlData.date) < weekInMilliSecs) {
                return
            }
            console.log(`Updating address`)
            // console.log(`Updating address (${entity.name})`)
        } catch (error) {
            console.log(error);
        }
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

    const pageIdRequest = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${escapedTitle}&format=json&origin=*`
    const pageIdResponse = await fetch(pageIdRequest);
    const data = await pageIdResponse.json();

    if (data && data.query && data.query.pages) {
        const page = Object.keys(data.query.pages)[0];
        wtf.fetch(parseInt(page, 10), lang).then(doc => {
            const info = doc.infobox(0).data;
            const images = ["logo", "image"];

            for (const img of images) {
                if (Object.keys(info).indexOf(img) > -1) {
                    const name = replaceAll(info[img].data.text, " ", "_");
                    const mdi = md5(name)
                    imageAddress = `https://upload.wikimedia.org/wikipedia/${lang}/${mdi[0]}/${mdi[0] + mdi[1]}/${name}`;

                    checkImage(
                        imageAddress,
                        () => { setImageUrl(imageAddress, component, entity) },
                        () => {
                            imageAddress = `https://upload.wikimedia.org/wikipedia/commons/${mdi[0]}/${mdi[0] + mdi[1]}/${name}`;
                            checkImage(
                                imageAddress,
                                () => { setImageUrl(imageAddress, component, entity) },
                                () => { noImage(component); });
                        });
                }
            }

        }).catch(noImage)
    }
};

function checkImage(imageSrc, good, bad) {
    try {
        var img = new Image();
        img.onload = good;
        img.onerror = bad;
        img.src = imageSrc;
    } catch (e) {
        console.log("404 expected if no image, trying something else")
    }
}


function noImage(component) {
    // console.log('noImage')
    return
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function setImageUrl(url, component, entity) {
    const d = new Date();
    if (localStorage) {
        localStorage[`image_${entity.id}`] = JSON.stringify({
            date: d,
            url
        })
    }
    // should move to check location is same as calling component's
    window && window.location.href.indexOf('/graph/') !== -1 && !component.prevent ? component.setState({
        image: url
    }) : console.warn('abort');

}
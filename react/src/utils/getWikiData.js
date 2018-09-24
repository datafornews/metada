import axios from 'axios';

export default async function (component, entity) {
    let localExtract = localStorage.getItem('wiki_' + entity.id + '_' + component.props.currentLanguage);
    if (localExtract !== null) {
        component.setState({
            extract: localExtract
        })
        return
    }
    if (!entity.wiki_link) {
        noArticle(component, '!entity.wiki_link');
        return;
    }
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
                noArticle(component, 'key === undefined');
                return;
            }

            const wikiEntity = wikiEntities[key];
            // console.log('wikiEntity', wikiEntity);
            if (wikiEntity) {
                const lang = component.props.currentLanguage;
                // console.log('lang', lang);
                const langLink = wikiEntity.sitelinks[lang + 'wiki']
                // console.log('LangLink', langLink);
                if (langLink) {
                    let query_url = 'https://' + lang + '.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles=';
                    query_url += encodeURIComponent(langLink.title);
                    query_url += '&redirects=1';
                    // console.log('Wikipedia URL', query_url);
                    getExtract(component, query_url, entity.id)
                } else {
                    noArticle(component, ['!langLink', lang]);
                    return;
                }
            }
        } else {
            noArticle(component, '!data.entities');
            return;
        }
    } catch (e) {
        console.log('Get Wiki Error', e)
        component.setState(
            {
                extract: component.props.translate('graph.wiki.cannotConnect')
            }
        );
    }


};

function getExtract(component, queryUrl, entityId) {
    axios.get(queryUrl).then(
        (response) => {
            if (response.data.query) {
                const pages = response.data.query.pages;
                const wiki_id = Object.keys(pages)[0];
                if (wiki_id) {
                    localStorage.setItem('wiki_' + entityId + '_' + component.props.currentLanguage, pages[wiki_id].extract);
                    component.setState(
                        {
                            extract: pages[wiki_id].extract
                        }
                    );
                }
            } else {
                noArticle(component, '!response.data.query');
                return;
            }
        },
        (error) => {
            console.log('Get Wiki Error', error)
            component.setState(
                {
                    extract: component.props.translate('graph.wiki.cannotConnect')
                }
            );
        }
    ).catch((error) => {
        console.log('Get Wiki Javascript Caught Error', error)
        component.setState(
            {
                extract: component.translate('graph.wiki.jsError')
            }
        );
    })
};

function noArticle(component, why = null) {
    console.log('Article not available');
    why && console.log(why);
    component.setState(
        {
            extract: component.props.translate('graph.wiki.noData')
        }
    );
}
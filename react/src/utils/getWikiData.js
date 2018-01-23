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
        noArticle(component);
        return;
    }
    const wiki = entity.wiki_link.split('/');
    const pageTitle = wiki[wiki.length - 1];

    let escapedTitle = pageTitle.indexOf('%') > -1 ? pageTitle : encodeURIComponent(pageTitle);
    escapedTitle = escapedTitle.replace('%25C3%2589', 'E').replace("'", '%27');

    let queryUrl = "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&titles=";
    queryUrl += escapedTitle + "&sites=enwiki|frwiki&origin=*";


    try {
        const response = await fetch(queryUrl);
        const data = await response.json();
        // console.log(entity.name, data);
        if (data.entities) {
            const wikiEntities = data.entities;

            let key, str;
            for (let k of Object.keys(wikiEntities)) {
                str = '' + k;
                if (str.length > 3) {
                    key = k;
                    break;
                }
            }

            if (key === undefined) {
                noArticle(component);
                return;
            }

            const wikiEntity = wikiEntities[key];
            if (wikiEntity) {
                const lang = component.props.currentLanguage;
                const langLink = wikiEntity.sitelinks[lang + 'wiki']
                if (langLink) {
                    let query_url = 'https://' + lang + '.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles=';
                    query_url += langLink.title;
                    getExtract(component, query_url, entity.id)
                } else {
                    noArticle(component);
                    return;
                }
            }
        } else {
            noArticle(component);
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
                noArticle(component);
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

function noArticle(component) {
    console.log('Article not available')
    component.setState(
        {
            extract: component.props.translate('graph.wiki.noData')
        }
    );
}
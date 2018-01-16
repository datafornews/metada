function fud(data, updateData) {
    let newEntities = data.entities.ids;
    let newShares = {};

    var localIndexesToDelete = [];

    let children = data.shares.children;
    let parents = data.shares.parents;
    for (let shares of Object.values(children)) {
        for (let share of shares) {
            if (!newShares[share.shareId]) {
                newShares[share.shareId] = share;
            }
        }
    }
    for (let shares of Object.values(parents)) {
        for (let share of shares) {
            if (!newShares[share.shareId]) {
                newShares[share.shareId] = share;
            }
        }
    }

    updateData.entities.map((v, k) => {
        if (v.blacklist) {
            // If entity is blacklisted, delete it from array of entities
            delete newEntities[v.id];
            delete localStorage['wiki_1_fr'];
            delete localStorage['wiki_1_en'];
        } else {
            delete v.blacklist;
            newEntities[v.id] = v;
        }
        localIndexesToDelete.push(v.id);
        //end of map()
        return null;
    });

    updateData.shares.map((v, k) => {
        v.id = v.parent_id + '-' + v.child_id;
        if (v.blacklist) {
            // If entity is blacklisted, delete it from array of entities
            delete newShares[v.id]
        } else {
            delete v.blacklist
            newShares[v.id] = v;
        }
        //end of map()
        localIndexesToDelete.push(v.parent_id);
        localIndexesToDelete.push(v.child_id);
        
        return null;
    });

    const reFormattedData = {
        entities: Object.values(newEntities),
        shares: Object.values(newShares).map((v, k) => {
            if (!v.value) {
                v.value = v.share;
            }
            return v
        })
    };

    for (let k of Object.keys(localStorage)){
        if (k.indexOf('cytoData_') > -1){
            localStorage.removeItem(k);
        }
    }

    return reFormattedData;
}

export default fud;
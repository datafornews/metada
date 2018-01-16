function formatUpdateDataBackground(data, updateData) {
    let newEntities = data.entities.ids;
    let newShares = {};

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
            delete newEntities[v.id]
        } else {
            delete v.blacklist
            newEntities[v.id] = v;
        }
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
        return null;
    });

    const reFormattedData = {
        entities: Object.values(newEntities),
        shares: Object.values(newShares).map((v, k) => {
            if (!v.value) {
                v.value = v.share
            }
            return v
        })
    };
    return reFormattedData
}
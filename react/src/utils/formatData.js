export default (serverData) => {
    var data = {
        entities: {
            names: {},
            ids: {}
        },
        shares: {
            children: {},
            parents: {}
        }
    };

    serverData.entities.map((v, i) => {
        data.entities.names[v.name] = v;
        data.entities.ids[v.id] = v;
        return null;
    });

    var ID = -100;
    for (let serverShare of serverData.shares) {
        const newShare = {
            ...serverShare,
            shareId: serverShare.parent_id + '-' + serverShare.child_id,
            id: ID

        };

        if (data.shares.children[newShare.child_id]) {
            data.shares.children[newShare.child_id].push(newShare);
        } else {
            data.shares.children[newShare.child_id] = [newShare];
        }

        if (data.shares.parents[newShare.parent_id]) {
            data.shares.parents[newShare.parent_id].push(newShare);
        } else {
            data.shares.parents[newShare.parent_id] = [newShare];
        }
        ID -= 1;
    }
    return data;
};
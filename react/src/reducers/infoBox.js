function infoBox(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_ENTITY_INFOBOX':
            if (typeof state.type === "string") {
                return {
                    entity: action.entityId,
                    share: null
                }
            }
            console.log('UPDATE_ENTITY_INFOBOX', {
                share: null,
                entity: action.entityId

            });
            return {
                share: null,
                entity: action.entityId

            }

        case 'UPDATE_SHARE_INFOBOX':
            if (typeof state.type === "string") {
                return {
                    entity: state.type === "entity" ? state.data : null,
                    share: action.share
                }
            }
            console.log('UPDATE_SHARE_INFOBOX', {
                ...state,
                share: action.share
            });
            return {
                ...state,
                share: action.share
            }


        default:
            return state;
    }
}

export default infoBox;
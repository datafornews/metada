function infoBox(state = [], action) {
    switch (action.type) {
        case 'UPDATE_ENTITY_INFOBOX':
            return {
                type: 'entity',
                data: action.entityId

            }

        case 'UPDATE_SHARE_INFOBOX':
            return {
                type: 'share',
                data: action.share
            }


        default:
            return state;
    }
}

export default infoBox;
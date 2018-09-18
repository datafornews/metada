export default function routerLocations(state = { locations: [], index: 0 }, action) {
    state = state instanceof Array ? { locations: [], index: 0 } : state;
    switch (action.type) {
        case "UPDATE_ROUTER_LOCATION":
            if (state.locations[state.locations.length - 1] === action.payload.pathname) {
                return state
            }
            const newLocs = [...state.locations.slice(0, state.index + 1), action.payload.pathname];
            return {
                locations: newLocs,
                index: newLocs.length - 1
            }
        case "RESET_ROUTER_LOCATION":
            return {
                locations: [action.payload.pathname],
                index: 0
            }
        case "GO_TO_NEXT_GRAPH":
            return {
                locations: state.locations,
                index: state.index + 1
            }
        case "GO_TO_PREVIOUS_GRAPH":
            return {
                locations: state.locations,
                index: state.index - 1
            }
        case "persist/REHYDRATE":
            return { locations: [], index: 0 }
        default:
            return state;
    }
}
function currentDisplay(state = [], action) {
  if (action.type === 'DISPLAY_ENTITY_GRAPH') {
    return action.entityId;
  }
  return state;
}

export default currentDisplay;

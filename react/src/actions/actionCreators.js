
export function setData(data) {
  return {
    type: 'SET_DATA',
    data,
  };
}

export function makeDataAvailable() {
  return {
    type: 'MAKE_DATA_AVAILABLE',
  };
}

export function displayEntity(entityId) {
  return {
    type: 'DISPLAY_ENTITY_GRAPH',
    entityId,
  };
}

export function updateEntityInfoBox(entityId) {
  return {
    type: 'UPDATE_ENTITY_INFOBOX',
    entityId: parseInt(entityId, 10),
  };
}

export function updateShareInfoBox(share) {
  return {
    type: 'UPDATE_SHARE_INFOBOX',
    share,
  };
}

export function setActiveLanguage(languageCode) {
  return {
    type: 'SET_ACTIVE_LANGUAGE',
    payload: { languageCode: languageCode }
  };
}

export function reRenderGraph() {
  return {
    type: "UPDATE_RENDER_STATUS"
  }
}
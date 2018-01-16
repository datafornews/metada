function dataToOptions(data) {
  const dict = data.entities.ids;
  return Object.keys(dict).map((k) => {
    const label = dict[k].name;
    const value = label.toLowerCase();
    const id = k;
    const className = 'select-options';
    return { label, value, id, className };
  });
}

function getIdSet(data) {
  const s = new Set(Object.keys(data.entities.ids).map(k => parseInt(k, 10)));
  return Array.from(s);
}

function data(state = [], action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...action.data,
        idSet: getIdSet(action.data),
        optionsData: dataToOptions(action.data),
      };
      case 'SET_ACTIVE_LANGUAGE':
        localStorage.setItem('activeLanguage', action.payload.languageCode);
        return state;
    default:
      return state;
  }
}

export default data;

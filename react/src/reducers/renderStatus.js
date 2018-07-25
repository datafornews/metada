function renderStatus(state = 0, action) {
    if (action.type === 'UPDATE_RENDER_STATUS') {
      return state + 1;
    }
    return state;
  }
  
  export default renderStatus;
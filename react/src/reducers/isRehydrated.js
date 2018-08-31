function isRehydrated(state = false, action) {
    if (action.type === 'persist/REHYDRATE') {
      return true;
    }
    return state;
  }
  
  export default isRehydrated;
function isRehydrated(state = false, action) {
    if (action.type === 'STORE_IS_REHYDRATED') {
      return true;
    }
    return state;
  }
  
  export default isRehydrated;
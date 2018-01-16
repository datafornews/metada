import { getTranslate, getActiveLanguage } from 'react-localize-redux';

function mapStateToProps(state) {
    return {
      data: state.data,
      dataIsAvailable: state.dataIsAvailable,
      currentDisplay: state.currentDisplay,
      infoBox: state.infoBox,
      show: state.show,
      translate: getTranslate(state.locale),
      currentLanguage: getActiveLanguage(state.locale).code,
      clientType: state.clientType,
      signupForm: state.signupForm,
      loginForm: state.loginForm,
      editProfileForm: state.editProfileForm,
      editEdgeForm: state.editEdgeForm,
      editEntityForm: state.editEntityForm,
      user: state.user
    };
  }

  export default mapStateToProps;
import getMuiTheme from 'material-ui/styles/createMuiTheme';
import foreseaColors from './colors';

import {
  convertColorToString,
  convertHexToRGB,
  darken,
  decomposeColor,
  emphasize,
  fade,
  getContrastRatio,
  getLuminance,
  lighten,
} from 'material-ui/styles/colorManipulator';
// import spacing from 'material-ui/styles/spacing';
// import typography from 'material-ui/styles/typography';
import spacing from './spacing';
import typography from './typography';
import 'material-ui/colors';


const _colors = require('material-ui/colors');

const red50 = '#ffebee';
const red100 = '#ffcdd2';
const red200 = '#ef9a9a';
const red300 = '#e57373';
const red400 = '#ef5350';
const red500 = '#f44336';
const red600 = '#e53935';
const red700 = '#d32f2f';
const red800 = '#c62828';
const red900 = '#b71c1c';
const redA100 = '#ff8a80';
const redA200 = '#ff5252';
const redA400 = '#ff1744';
const redA700 = '#d50000';

const pink50 = '#fce4ec';
const pink100 = '#f8bbd0';
const pink200 = '#f48fb1';
const pink300 = '#f06292';
const pink400 = '#ec407a';
const pink500 = '#e91e63';
const pink600 = '#d81b60';
const pink700 = '#c2185b';
const pink800 = '#ad1457';
const pink900 = '#880e4f';
const pinkA100 = '#ff80ab';
const pinkA200 = '#ff4081';
const pinkA400 = '#f50057';
const pinkA700 = '#c51162';

const purple50 = '#f3e5f5';
const purple100 = '#e1bee7';
const purple200 = '#ce93d8';
const purple300 = '#ba68c8';
const purple400 = '#ab47bc';
const purple500 = '#9c27b0';
const purple600 = '#8e24aa';
const purple700 = '#7b1fa2';
const purple800 = '#6a1b9a';
const purple900 = '#4a148c';
const purpleA100 = '#ea80fc';
const purpleA200 = '#e040fb';
const purpleA400 = '#d500f9';
const purpleA700 = '#aa00ff';

const deepPurple50 = '#ede7f6';
const deepPurple100 = '#d1c4e9';
const deepPurple200 = '#b39ddb';
const deepPurple300 = '#9575cd';
const deepPurple400 = '#7e57c2';
const deepPurple500 = '#673ab7';
const deepPurple600 = '#5e35b1';
const deepPurple700 = '#512da8';
const deepPurple800 = '#4527a0';
const deepPurple900 = '#311b92';
const deepPurpleA100 = '#b388ff';
const deepPurpleA200 = '#7c4dff';
const deepPurpleA400 = '#651fff';
const deepPurpleA700 = '#6200ea';

const indigo50 = '#e8eaf6';
const indigo100 = '#c5cae9';
const indigo200 = '#9fa8da';
const indigo300 = '#7986cb';
const indigo400 = '#5c6bc0';
const indigo500 = '#3f51b5';
const indigo600 = '#3949ab';
const indigo700 = '#303f9f';
const indigo800 = '#283593';
const indigo900 = '#1a237e';
const indigoA100 = '#8c9eff';
const indigoA200 = '#536dfe';
const indigoA400 = '#3d5afe';
const indigoA700 = '#304ffe';

const blue50 = '#e3f2fd';
const blue100 = '#bbdefb';
const blue200 = '#90caf9';
const blue300 = '#64b5f6';
const blue400 = '#42a5f5';
const blue500 = '#2196f3';
const blue600 = '#1e88e5';
const blue700 = '#1976d2';
const blue800 = '#1565c0';
const blue900 = '#0d47a1';
const blueA100 = '#82b1ff';
const blueA200 = '#448aff';
const blueA400 = '#2979ff';
const blueA700 = '#2962ff';

const lightBlue50 = '#e1f5fe';
const lightBlue100 = '#b3e5fc';
const lightBlue200 = '#81d4fa';
const lightBlue300 = '#4fc3f7';
const lightBlue400 = '#29b6f6';
const lightBlue500 = '#03a9f4';
const lightBlue600 = '#039be5';
const lightBlue700 = '#0288d1';
const lightBlue800 = '#0277bd';
const lightBlue900 = '#01579b';
const lightBlueA100 = '#80d8ff';
const lightBlueA200 = '#40c4ff';
const lightBlueA400 = '#00b0ff';
const lightBlueA700 = '#0091ea';

const cyan50 = '#e0f7fa';
const cyan100 = '#b2ebf2';
const cyan200 = '#80deea';
const cyan300 = '#4dd0e1';
const cyan400 = '#26c6da';
const cyan500 = '#00bcd4';
const cyan600 = '#00acc1';
const cyan700 = '#0097a7';
const cyan800 = '#00838f';
const cyan900 = '#006064';
const cyanA100 = '#84ffff';
const cyanA200 = '#18ffff';
const cyanA400 = '#00e5ff';
const cyanA700 = '#00b8d4';

const teal50 = '#e0f2f1';
const teal100 = '#b2dfdb';
const teal200 = '#80cbc4';
const teal300 = '#4db6ac';
const teal400 = '#26a69a';
const teal500 = '#009688';
const teal600 = '#00897b';
const teal700 = '#00796b';
const teal800 = '#00695c';
const teal900 = '#004d40';
const tealA100 = '#a7ffeb';
const tealA200 = '#64ffda';
const tealA400 = '#1de9b6';
const tealA700 = '#00bfa5';

const green50 = '#e8f5e9';
const green100 = '#c8e6c9';
const green200 = '#a5d6a7';
const green300 = '#81c784';
const green400 = '#66bb6a';
const green500 = '#4caf50';
const green600 = '#43a047';
const green700 = '#388e3c';
const green800 = '#2e7d32';
const green900 = '#1b5e20';
const greenA100 = '#b9f6ca';
const greenA200 = '#69f0ae';
const greenA400 = '#00e676';
const greenA700 = '#00c853';

const lightGreen50 = '#f1f8e9';
const lightGreen100 = '#dcedc8';
const lightGreen200 = '#c5e1a5';
const lightGreen300 = '#aed581';
const lightGreen400 = '#9ccc65';
const lightGreen500 = '#8bc34a';
const lightGreen600 = '#7cb342';
const lightGreen700 = '#689f38';
const lightGreen800 = '#558b2f';
const lightGreen900 = '#33691e';
const lightGreenA100 = '#ccff90';
const lightGreenA200 = '#b2ff59';
const lightGreenA400 = '#76ff03';
const lightGreenA700 = '#64dd17';

const lime50 = '#f9fbe7';
const lime100 = '#f0f4c3';
const lime200 = '#e6ee9c';
const lime300 = '#dce775';
const lime400 = '#d4e157';
const lime500 = '#cddc39';
const lime600 = '#c0ca33';
const lime700 = '#afb42b';
const lime800 = '#9e9d24';
const lime900 = '#827717';
const limeA100 = '#f4ff81';
const limeA200 = '#eeff41';
const limeA400 = '#c6ff00';
const limeA700 = '#aeea00';

const yellow50 = '#fffde7';
const yellow100 = '#fff9c4';
const yellow200 = '#fff59d';
const yellow300 = '#fff176';
const yellow400 = '#ffee58';
const yellow500 = '#ffeb3b';
const yellow600 = '#fdd835';
const yellow700 = '#fbc02d';
const yellow800 = '#f9a825';
const yellow900 = '#f57f17';
const yellowA100 = '#ffff8d';
const yellowA200 = '#ffff00';
const yellowA400 = '#ffea00';
const yellowA700 = '#ffd600';

const amber50 = '#fff8e1';
const amber100 = '#ffecb3';
const amber200 = '#ffe082';
const amber300 = '#ffd54f';
const amber400 = '#ffca28';
const amber500 = '#ffc107';
const amber600 = '#ffb300';
const amber700 = '#ffa000';
const amber800 = '#ff8f00';
const amber900 = '#ff6f00';
const amberA100 = '#ffe57f';
const amberA200 = '#ffd740';
const amberA400 = '#ffc400';
const amberA700 = '#ffab00';

const orange50 = '#fff3e0';
const orange100 = '#ffe0b2';
const orange200 = '#ffcc80';
const orange300 = '#ffb74d';
const orange400 = '#ffa726';
const orange500 = '#ff9800';
const orange600 = '#fb8c00';
const orange700 = '#f57c00';
const orange800 = '#ef6c00';
const orange900 = '#e65100';
const orangeA100 = '#ffd180';
const orangeA200 = '#ffab40';
const orangeA400 = '#ff9100';
const orangeA700 = '#ff6d00';

const deepOrange50 = '#fbe9e7';
const deepOrange100 = '#ffccbc';
const deepOrange200 = '#ffab91';
const deepOrange300 = '#ff8a65';
const deepOrange400 = '#ff7043';
const deepOrange500 = '#ff5722';
const deepOrange600 = '#f4511e';
const deepOrange700 = '#e64a19';
const deepOrange800 = '#d84315';
const deepOrange900 = '#bf360c';
const deepOrangeA100 = '#ff9e80';
const deepOrangeA200 = '#ff6e40';
const deepOrangeA400 = '#ff3d00';
const deepOrangeA700 = '#dd2c00';

const brown50 = '#efebe9';
const brown100 = '#d7ccc8';
const brown200 = '#bcaaa4';
const brown300 = '#a1887f';
const brown400 = '#8d6e63';
const brown500 = '#795548';
const brown600 = '#6d4c41';
const brown700 = '#5d4037';
const brown800 = '#4e342e';
const brown900 = '#3e2723';

const blueGrey50 = '#eceff1';
const blueGrey100 = '#cfd8dc';
const blueGrey200 = '#b0bec5';
const blueGrey300 = '#90a4ae';
const blueGrey400 = '#78909c';
const blueGrey500 = '#607d8b';
const blueGrey600 = '#546e7a';
const blueGrey700 = '#455a64';
const blueGrey800 = '#37474f';
const blueGrey900 = '#263238';

const grey50 = '#fafafa';
const grey100 = '#f5f5f5';
const grey200 = '#eeeeee';
const grey300 = '#e0e0e0';
const grey400 = '#bdbdbd';
const grey500 = '#9e9e9e';
const grey600 = '#757575';
const grey700 = '#616161';
const grey800 = '#424242';
const grey900 = '#212121';

const black = '#000000';
const white = '#ffffff';

const transparent = 'rgba(0, 0, 0, 0)';
const fullBlack = 'rgba(0, 0, 0, 1)';
const darkBlack = 'rgba(0, 0, 0, 0.87)';
const lightBlack = 'rgba(0, 0, 0, 0.54)';
const minBlack = 'rgba(0, 0, 0, 0.26)';
const faintBlack = 'rgba(0, 0, 0, 0.12)';
const fullWhite = 'rgba(255, 255, 255, 1)';
const darkWhite = 'rgba(255, 255, 255, 0.87)';
const lightWhite = 'rgba(255, 255, 255, 0.54)';


const _colorManipulator = require('material-ui/styles/colorManipulator');


const palette = {
  primary1Color: cyan500,
  primary2Color: cyan700,
  primary3Color: grey400,
  accent1Color: foreseaColors.foreseaDarkBlue,
  accent2Color: grey100,
  accent3Color: grey500,
  textColor: fade(darkBlack, 0.80),
  secondaryTextColor: fade(darkBlack, 0.54),
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey300,
  disabledColor: fade(darkBlack, 0.3),
  pickerHeaderColor: cyan500,
  clockCircleColor: fade(darkBlack, 0.07),
  shadowColor: fullBlack,
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme constiables needed for every component. constiables not defined
 *  in a custom theme will default to these values.
 */

const baseTheme = getMuiTheme(
  {

    appBar: {
      color: white,
      textColor: palette.alternateTextColor,
      height: spacing.desktopKeylineIncrement,
      titleFontWeight: typography.fontWeightNormal,
      padding: spacing.desktopGutter,
    },
    avatar: {
      color: palette.canvasColor,
      backgroundColor: emphasize(palette.canvasColor, 0.26),
    },
    badge: {
      color: palette.alternateTextColor,
      textColor: palette.textColor,
      primaryColor: palette.primary1Color,
      primaryTextColor: palette.alternateTextColor,
      secondaryColor: foreseaColors.foreseaLightBlue,
      secondaryTextColor: black,
      fontWeight: typography.fontWeightMedium,
    },
    bottomNavigation: {
      backgroundColor: palette.canvasColor,
      unselectedColor: fade(palette.textColor, 0.54),
      selectedColor: palette.primary1Color,
      height: 56,
      unselectedFontSize: 12,
      selectedFontSize: 14,
    },
    button: {
      height: 30,
      minWidth: 88,
      iconButtonSize: spacing.iconSize * 2,
    },
    card: {
      titleColor: fade(palette.textColor, 0.87),
      subtitleColor: fade(palette.textColor, 0.54),
      fontWeight: typography.fontWeightMedium,

    },




    cardMedia: {
      color: darkWhite,
      overlayContentBackground: lightBlack,
      titleColor: darkWhite,
      subtitleColor: lightWhite,
    },
    cardText: {
      textColor: palette.textColor,
    },


    checkbox: {
      boxColor: palette.textColor,
      checkedColor: palette.primary1Color,
      requiredColor: palette.primary1Color,
      disabledColor: palette.disabledColor,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor,
    },
    chip: {
      backgroundColor: emphasize(palette.canvasColor, 0.12),
      deleteIconColor: fade(palette.textColor, 0.26),
      textColor: fade(palette.textColor, 0.87),
      // fontSize: 14,
      fontSize: 12,
      fontWeight: typography.fontWeightNormal,
      shadow: `0 1px 6px ${fade(palette.shadowColor, 0.12)},
        0 1px 4px ${fade(palette.shadowColor, 0.12)}`,
    },
    datePicker: {
      color: palette.primary1Color,
      textColor: palette.alternateTextColor,
      calendarTextColor: palette.textColor,
      selectColor: palette.primary2Color,
      selectTextColor: palette.alternateTextColor,
      calendarYearBackgroundColor: palette.canvasColor,
      headerColor: palette.pickerHeaderColor || palette.primary1Color,
    },
    dialog: {
      // titleFontSize: 22,
      titleFontSize: 18,
      // bodyFontSize: 16,
      bodyFontSize: 14,
      bodyColor: fade(palette.textColor, 0.6),
    },
    dropDownMenu: {
      accentColor: palette.borderColor,
    },
    enhancedButton: {
      tapHighlightColor: transparent,
    },
    flatButton: {
      color: transparent,
      buttonFilterColor: '#999999',
      disabledTextColor: fade(palette.textColor, 0.3),
      textColor: palette.textColor,
      primaryTextColor: foreseaColors.foreseaDarkBlue,
      secondaryTextColor: palette.accent1Color,
      fontSize: typography.fontStyleButtonFontSize,
      fontWeight: typography.fontWeightMedium,
    },
    floatingActionButton: {
      buttonSize: 56,
      miniSize: 40,
      color: palette.primary1Color,
      iconColor: palette.alternateTextColor,
      secondaryColor: palette.accent1Color,
      secondaryIconColor: palette.alternateTextColor,
      disabledTextColor: palette.disabledColor,
      disabledColor: emphasize(palette.canvasColor, 0.12),
    },
    gridTile: {
      textColor: white,
    },
    icon: {
      color: palette.canvasColor,
      backgroundColor: palette.primary1Color,
    },
    inkBar: {
      backgroundColor: palette.accent1Color,
    },
    drawer: {
      width: spacing.desktopKeylineIncrement * 4,
      color: foreseaColors.foreseaDarkBlue,
    },
    listItem: {
      nestedLevelDepth: 18,
      secondaryTextColor: palette.secondaryTextColor,
      leftIconColor: grey600,
      rightIconColor: grey600,
    },
    menu: {
      textColor: white,
      backgroundColor: palette.canvasColor,
      containerBackgroundColor: foreseaColors.foreseaDarkBlue,
    },
    menuItem: {
      textColor: white,
      dataHeight: 24,
      height: 36,
      hoverColor: foreseaColors.foreseaLightBlue,
      padding: spacing.desktopGutter,
      selectedTextColor: palette.accent1Color,
      rightIconDesktopFill: grey600,
    },
    menuSubheader: {
      padding: spacing.desktopGutter,
      borderColor: palette.borderColor,
      textColor: palette.primary1Color,
    },
    overlay: {
      backgroundColor: lightBlack,
    },
    paper: {
      color: palette.textColor,
      backgroundColor: palette.canvasColor,
      zDepthShadows: [
        [1, 6, 0.12, 1, 4, 0.12],
        [3, 10, 0.16, 3, 10, 0.23],
        [10, 30, 0.19, 6, 10, 0.23],
        [14, 45, 0.25, 10, 18, 0.22],
        [19, 60, 0.30, 15, 20, 0.22],
      ].map(d => (
        `0 ${d[0]}px ${d[1]}px ${fade(palette.shadowColor, d[2])},
         0 ${d[3]}px ${d[4]}px ${fade(palette.shadowColor, d[5])}`
      )),
    },
    radioButton: {
      borderColor: palette.textColor,
      backgroundColor: palette.alternateTextColor,
      checkedColor: palette.primary1Color,
      requiredColor: palette.primary1Color,
      disabledColor: palette.disabledColor,
      size: 24,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor,
    },
    raisedButton: {
      color: palette.alternateTextColor,
      textColor: palette.textColor,
      primaryColor: foreseaColors.foreseaDarkBlue,
      primaryTextColor: palette.alternateTextColor,
      secondaryColor: green600,
      secondaryTextColor: white,
      disabledColor: darken(palette.alternateTextColor, 0.1),
      disabledTextColor: fade(palette.textColor, 0.3),
      fontSize: typography.fontStyleButtonFontSize,
      fontWeight: typography.fontWeightMedium,
    },
    refreshIndicator: {
      strokeColor: palette.borderColor,
      loadingStrokeColor: palette.primary1Color,
    },
    ripple: {
      color: fade(palette.textColor, 0.87),
    },
    slider: {
      trackSize: 2,
      trackColor: palette.primary3Color,
      trackColorSelected: palette.accent3Color,
      handleSize: 12,
      handleSizeDisabled: 8,
      handleSizeActive: 18,
      handleColorZero: palette.primary3Color,
      handleFillColor: palette.alternateTextColor,
      selectionColor: palette.primary1Color,
      rippleColor: palette.primary1Color,
    },
    snackbar: {
      textColor: palette.alternateTextColor,
      backgroundColor: palette.textColor,
      actionColor: palette.accent1Color,
    },
    subheader: {
      color: fade(palette.textColor, 0.54),
      fontWeight: typography.fontWeightMedium,
    },
    stepper: {
      backgroundColor: 'transparent',
      hoverBackgroundColor: fade(black, 0.06),
      iconColor: foreseaColors.foreseaGreen,
      hoveredIconColor: grey700,
      inactiveIconColor: grey500,
      textColor: fade(black, 0.87),
      disabledTextColor: fade(black, 0.26),
      connectorLineColor: grey400,
    },
    svgIcon: {
      color: palette.textColor,
    },
    table: {
      backgroundColor: palette.canvasColor,
    },
    tableFooter: {
      borderColor: palette.borderColor,
      textColor: palette.accent3Color,
    },
    tableHeader: {
      borderColor: palette.borderColor,
    },
    tableHeaderColumn: {
      textColor: palette.accent3Color,
      height: 44,
      spacing: 24,
    },
    tableRow: {
      hoverColor: palette.accent2Color,
      stripeColor: fade(lighten(foreseaColors.foreseaSand, 0.5), 0.4),
      selectedColor: palette.borderColor,
      textColor: palette.textColor,
      borderColor: palette.borderColor,
      height: 36,
    },
    tableRowColumn: {
      height: 36,
      spacing: 24,
    },
    tabs: {
      backgroundColor: white,
      textColor: foreseaColors.foreseaInfoBlue,
      selectedTextColor: foreseaColors.foreseaDarkBlue,
    },
    textField: {
      textColor: palette.textColor,
      hintColor: palette.disabledColor,
      floatingLabelColor: palette.disabledColor,
      disabledTextColor: palette.disabledColor,
      errorColor: red500,
      focusColor: palette.primary1Color,
      backgroundColor: 'transparent',
      borderColor: palette.borderColor,
    },
    timePicker: {
      color: palette.alternateTextColor,
      textColor: palette.alternateTextColor,
      accentColor: palette.primary1Color,
      clockColor: palette.textColor,
      clockCircleColor: palette.clockCircleColor,
      headerColor: palette.pickerHeaderColor || palette.primary1Color,
      selectColor: palette.primary2Color,
      selectTextColor: palette.alternateTextColor,
    },
    toggle: {
      thumbOnColor: palette.primary1Color,
      thumbOffColor: palette.accent2Color,
      thumbDisabledColor: palette.borderColor,
      thumbRequiredColor: palette.primary1Color,
      trackOnColor: fade(palette.primary1Color, 0.5),
      trackOffColor: palette.primary3Color,
      trackDisabledColor: palette.primary3Color,
      labelColor: palette.textColor,
      labelDisabledColor: palette.disabledColor,
      trackRequiredColor: fade(palette.primary1Color, 0.5),
    },
    toolbar: {
      color: fade(palette.textColor, 0.54),
      hoverColor: fade(palette.textColor, 0.87),
      backgroundColor: darken(palette.accent2Color, 0.05),
      height: 56,
      // titleFontSize: 20,
      titleFontSize: 12,
      iconColor: fade(palette.textColor, 0.4),
      separatorColor: fade(palette.textColor, 0.175),
      menuHoverColor: fade(palette.textColor, 0.1),
    },
    tooltip: {
      color: white,
      rippleBackgroundColor: grey700,
    },
  },
);

export default baseTheme;

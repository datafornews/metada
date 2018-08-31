import { createMuiTheme } from '@material-ui/core/styles';

export const colors = {
  m: '#3f51b5',
  c: 'rgb(187, 45, 45)',
  i: 'rgb(1, 41, 71)',
  primary: '#223843',
  secondary: '#caccce',
  accent: "green",
  default: "#598234"
};


const palette = {
  primary: {
    main: colors.primary,
  },
  secondary: {
    main: colors.secondary,
  },
  accent: colors.accent,
  default: colors.default,
}
const themeName = 'Purple Heart Gull Gray Guinea';

export default createMuiTheme({ palette, themeName });
//https://react-theming.github.io/create-mui-theme/
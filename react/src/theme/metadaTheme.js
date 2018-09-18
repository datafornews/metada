import { createMuiTheme } from '@material-ui/core/styles';
import Newspaper from 'react-icons/lib/fa/newspaper-o'
import Building from "react-icons/lib/fa/building"
import User from "react-icons/lib/fa/user"

export const colors = {
  m: '#3f51b5',
  c: 'rgb(154, 182, 234)',
  i: 'rgb(1, 41, 71)',
  primary: '#3f51b5',
  secondary: 'rgb(80, 80, 96)',
  accent: "green",
  default: "rgb(246,244,244)"
};

export const MediaIcon = Newspaper;
export const IndividualIcon = User;
export const CompanyIcon = Building;



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
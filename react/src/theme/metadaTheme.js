import Newspaper from 'react-icons/lib/fa/newspaper-o'
import Building from "react-icons/lib/fa/building"
import User from "react-icons/lib/fa/user"

import { createMuiTheme } from '@material-ui/core/styles';

export const colors = {
  m: "rgb(32,94,196)",
  c: 'rgb(144, 159, 199)',
  i: 'rgb(1, 41, 71)',
  primary: '#3f51b5',
  secondary: 'rgb(80, 80, 96)',
  accent: "green",
  default: "rgb(246,244,244)",
  background: "rgb(244, 241, 238)" // If this value is changed, change it also in the hamburger part of index.css
};

export const MediaIcon = Newspaper;
export const IndividualIcon = User;
export const CompanyIcon = Building;

const overrides = {
  MUIDataTable: {
    paper: {
      boxShadow: 'unset',
      maxWidth: '100%',
      overflow: 'auto'
    }
  }
}

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

export const typography = {
  fontFamily: "Quicksand, Roboto, sans-serif, arial, fantasy",
  display3: {
    fontSize: '3.5rem'
  }
};

const themeName = 'Purple Heart Gull Gray Guinea';

const theme = {
  palette,
  themeName,
  typography,
  overrides
}

export default createMuiTheme(theme);
//https://react-theming.github.io/create-mui-theme/

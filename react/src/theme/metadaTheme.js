import { createMuiTheme } from '@material-ui/core/styles';
// import grey from '@material-ui/core/colors/grey';
// import deepPurple from '@material-ui/core/colors/deepPurple';
// import red from '@material-ui/core/colors/red';


// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
    palette: {
        default: {
            light: '#ffffff',
            main: '#f5f5f5',
            dark: '#c2c2c2',
        },
        primary: {
            light: '#9061e2',
            main: 'rgb(65, 83, 183)',
            dark: '#27057f',
        },
        secondary: {
            main: '#ff7543',
            light: '#d84315',
            dark: '#9f0000',
        }
    },
});

export default theme;
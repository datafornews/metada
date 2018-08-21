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
            main: '#00838f',
            light: '#4fb3bf',
            dark: '#005662',
        },
        secondary: {
            main: '#90a4ae',
            light: '#c1d5e0',
            dark: '#62757f',
        }
    },
});

export default theme;
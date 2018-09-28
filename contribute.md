# How to Contribute to Metada

## Get started

You need to have `npm` installed. I recommend you also have `yarn` and use the latter rather than the former -> https://yarnpkg.com/lang/en/docs/install/

1. Clone the project `git clone https://github.com/Vict0rSch/metada.git`
2. Checkout the `dev` branch: `git checkout dev`
3. Go to `react/`: `cd ./metada/react/`
4. run `npm install` (or `yarn`)
5. run `npm start` (or `yarn`) to **start the dev server** and hot-reloading of React Components
    * That's it! The server runs on port `3000` so go to `http://localhost:3000/`

### Developping the extension

To work on the development of the extension part, you need to install it as an unpackaged extension. So you need to `build` the code and then load it into chrome.

1. To **build** the **extension** run `yarn extension` which will build the app and update the content of `metada/Extension` accordingly
2. In Chrome, go to Extensions : `chrome://extensions/` (you can type this in the address bar)
3. Allow the "Developper Mode" by clicking on the checkbox (top right)
4. Click on "Load unpacked extension" select the `Extension`
5. Now everytime you want to see the effect of the changes in the code on the extension, you'll have to run `yarn extension` and the extension will be updated. 

The build process may take anywhere between 20s and 1+m depending on your cpu.

## Dependencies

Metada is based on [**material-ui**](https://material-ui.com/) and most components come from there. Notable other dependencies are:

* [`react-redux`](https://github.com/reduxjs/react-redux) to manage the state of the app
* [`redux-persist`](https://github.com/rt2zz/redux-persist) to persist the app's state (useful mainly for the extension, less for the website)
* [`react-router`](https://github.com/ReactTraining/react-router) to handle the routing of components
* [`cytoscape`](https://js.cytoscape.org/) to draw the graph

* [`react-select`](https://react-select.com/) for the search bar
* [`react-loader-spinner`](https://github.com/mhnpd/react-loader-spinner) for the airplane loader
* [`react-icons`](http://react-icons.benjamintatum.com/all) for non-material icons
* [`react-localize-redux`](https://github.com/ryandrewjohnson/react-localize-redux/) to handle multiple languages

## Using Material-UI

Checkout how to use the `<Grid ></Grid>` component to manage the layout -> [material-ui.com/layout/grid/](https://material-ui.com/layout/grid/)

### Style

Do read [material-ui.com/customization/themes/](https://material-ui.com/customization/themes/) to get into how theming is handled.

Also read [material-ui.com/customization/overrides/](https://material-ui.com/customization/overrides/) to apply custom css to individual component.

Use `style={{someAttribute:someValue}}` if the attribute or value must change dynamically depending on the component's state or props, otherwise use `className={classes.someClass}`

#### Custom theme

The default theme is found there: [material-ui.com/customization/default-theme/](https://material-ui.com/customization/default-theme/).
To override any value, customize the object passed to `createMuiTheme` in `metada/react/src/theme/metadaTheme.js`.

For now only the `palette` field is overridden to customize colors.

### Default component

The default component I use looks like:

```javascript
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  container:{

  }
});

class SomeComponent extends Component {
  render() {

    const { classes } = this.props;

    return (
    <div className={classes.container}>

    </div>
    );
  }
}

SomeComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SomeComponent);

```
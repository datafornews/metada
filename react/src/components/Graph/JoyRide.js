import Joyride from 'react-joyride';
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({

});

class JoyRide extends Component {
    state = {
        run: false,
        steps: [
            {
                target: '#drawer-metada',
                content: 'This if my awesome feature!',
                placement: 'right',
            },
            {
                target: '.joyride-appbaricons',
                content: 'This if my awesome feature!',
                placement: 'bottom',
            },
        ]
    };

    componentDidMount() {
        this.setState({ run: true });
    }

    callback = (data) => {
        const { action, index, type } = data;
        console.log({ action, index, type });
    };

    render() {
        const { steps, run } = this.state;
        const { theme } = this.props;

        return <Joyride
            steps={steps}
            run={run}
            continuous={true}
            callback={this.callback}
            styles={{
                options: {
                    beaconSize: '100px',
                    primaryColor: theme.palette.primary.main,
                }
            }}
        />
    }
}

export default withStyles(styles, { withTheme: true })(JoyRide);
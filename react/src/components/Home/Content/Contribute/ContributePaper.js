import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import HomePaper from '../../Paper/HomePaper'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {

    },
    iframe: {
        width: '100%',
        height: '970px'
    }
});

class ContributePaper extends Component {

    
    render() {
        const { classes, ...noClassesProps } = this.props;
        return (
            <div><HomePaper
                {...noClassesProps}
                toggle={this.props.toggleContribute}
                content={
                    <div>
                        <Typography color="primary" variant="display1">
                            {this.props.translate('home.contribute.title')}
                        </Typography>
                    </div>
                } />
                <iframe className={classes.iframe} src="https://docs.google.com/forms/d/e/1FAIpQLSf3J6dXZd3iLbyu2n9V7vJksutiZmG1GlBKq8ZhN99M4rsUhw/viewform?embedded=true" width="100%" frameBorder="0" marginHeight="0" marginWidth="0">Chargement en cours...</iframe>
            </div>
        )
    }
}

export default withStyles(styles)(ContributePaper);
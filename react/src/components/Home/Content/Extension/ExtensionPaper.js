import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MarkdownPaper from '../../Paper/MarkdownPaper';



const styles = theme => ({
    container: {
        textAlign: 'center',
        margin: 'auto',
        maxWidth: 550
    },
    img: {
        maxWidth: '100%'
    }
});

class ExtensionPaper extends Component {

    render() {
        const { classes } = this.props;

        const gifLink = "https://media.giphy.com/media/3dgfdtwTCvQmahTGjW/giphy.gif";

        return (
            <MarkdownPaper
                {...this.props}
                source={this.props.translate('home.extensionPaperMd')}
                extra={<div className={classes.container}>
                    <a href={gifLink} target='_blank'>
                        <img className={classes.img} src={gifLink} alt="Loading Metada demonstration gif..."></img>
                    </a>
                </div>}
                toggle={this.props.toggleContact}
            />
        );
    }
}

export default withStyles(styles)(ExtensionPaper);
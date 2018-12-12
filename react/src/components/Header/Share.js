import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import {
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    LinkedinShareButton, LinkedinIcon
} from 'react-share';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: "space-between",
        width: '100%'
    }
});

class Share extends Component {
    render() {
        const shareUrl = 'https://metada.org';
        const title = "Metada: une extension pour voir à qui appartiennent les médias!";

        const { classes } = this.props;
        return (
            <div className={classes.container}>
                {/* <span className={classes.spread}>Spread the love!</span> */}
                <Tooltip placement="bottom" title="Share on Facebook">
                    <div style={{ display: this.props.clientType === "mobile" ? "block" : "inline-block" }} >
                        <FacebookShareButton
                            url={shareUrl}
                            quote={title}
                            className={classes.shareButton}>
                            <FacebookIcon
                                size={32}
                                round
                            />
                        </FacebookShareButton>
                    </div>
                </Tooltip>
                <Tooltip placement="bottom" title="Share on Twitter">
                    <div style={{ display: this.props.clientType === "mobile" ? "block" : "inline-block" }}>
                        <TwitterShareButton
                            url={shareUrl}
                            title={title}
                            className={classes.shareButton}>
                            <TwitterIcon
                                size={32}
                                round
                            />
                        </TwitterShareButton>
                    </div>
                </Tooltip>
                {this.props.clientType === "mobile" && <Tooltip placement="left" title="Share on Whatsapp">
                    <div>
                        <WhatsappShareButton
                            url={shareUrl}
                            title={title}
                            className={classes.shareButton}>
                            <WhatsappIcon
                                size={32}
                                round
                            />
                        </WhatsappShareButton>
                    </div>
                </Tooltip>}
                <Tooltip placement="bottom" title="Share on Linkedin">
                    <div style={{ display: this.props.clientType === "mobile" ? "block" : "inline-block" }}>
                        <LinkedinShareButton
                            url={shareUrl}
                            title={title}
                            className={classes.shareButton}>
                            <LinkedinIcon
                                size={32}
                                round
                            />
                        </LinkedinShareButton>
                    </div>
                </Tooltip>
            </div>
        )
    }
}

export default withStyles(styles)(Share);
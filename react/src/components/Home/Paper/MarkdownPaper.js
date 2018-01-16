import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Markdown from 'react-markdown';
import HomePaper from './HomePaper';


const styles = theme => ({
    root: theme.mixins.gutters({
        padding: 30,
        marginTop: theme.spacing.unit * 3,
        display: 'inline-block',
        marginBottom: '30px'
    }),
});


class MarkdownPaper extends Component {

    render() {
        return <HomePaper
            toggle={this.props.toggle}
            {...this.props}
            content={
                (<div>
                    <Markdown source={this.props.source} escapeHtml={false} />
                    {this.props.extra}
                </div>
                )
            }
        />

    }
}

export default withStyles(styles)(MarkdownPaper);
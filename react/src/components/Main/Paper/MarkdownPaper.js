import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import Markdown from 'react-markdown';
import HomePaper from './HomePaper';
import PropTypes from 'prop-types';

class MarkdownPaper extends Component {

    render() {
        return <HomePaper
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

MarkdownPaper.propTypes = {
    source: PropTypes.string.isRequired,
    extra: PropTypes.object,
};

// export default withStyles(styles)(MarkdownPaper);
export default MarkdownPaper;
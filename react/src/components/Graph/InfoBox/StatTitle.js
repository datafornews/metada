import React, { Component } from 'react'
import PropTypes from 'prop-types';

const textStyle = {
    color: "grey",
    fontStyle: "italic",
    margin: "auto 10px"
}

class StatTitle extends Component {

    getStats = () => {
        if (localStorage.stats) {
            const stats = JSON.parse(localStorage.stats);
            if (stats) {
                if (!stats.counts) {  // legacy stats don't have a count attribute
                    localStorage.removeItem('stats');
                    return 0
                }
                if (stats.counts.total.hasOwnProperty(this.props.entity.name)) {
                    const count = stats.counts.total[this.props.entity.name];
                    const total = Object.values(stats.counts.total).reduce((a, b) => a + b);
                    return Math.round(count / total * 1000) / 10;
                }
            }
        }
        return 0
    }

    render() {

        const { translate } = this.props;

        const percent = this.getStats();
        let text = ""
        if (percent > 0) {
            text = `(${percent}% ${translate('graph.infoBoxStat')})`;
            return <span style={textStyle}>{text}</span>
        }
        return ''
    }
}


StatTitle.propTypes = {
    entity: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

export default StatTitle
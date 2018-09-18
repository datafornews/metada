import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { colors } from '../../../../theme/metadaTheme';

const styles = {
    size: {
        width: 40,
        height: 40,
    },
    sizeIcon: {
        fontSize: 20,
    },
};

class CheckboxLabels extends React.Component {


    componentDidMount() {
        if (this.props.match && this.props.match.params.filter === "0") {
            this.props.history.push('/');
        }
    }


    handleChange = count => event => {
        if (!this.props.location.pathname.startsWith('/s/')) {
            this.props.history.push(`/s/${count}`);
            return
        }
        const filter = this.props.match.params.filter;
        let newFilter;
        if (/^\d+$/.test(filter)) {
            newFilter = event.target.checked ? parseInt(filter, 10) + count : parseInt(filter, 10) - count;
            if (newFilter === 0) {
                this.props.history.push('/');
                return
            }
            this.props.history.push(`/s/${newFilter}`)
            return
        }
    };

    render() {
        // const { classes } = this.props;
        let requirements;
        if (this.props.history.location.pathname.startsWith('/s/')) {
            requirements = parseInt(this.props.match.params.filter, 10);
        } else {
            requirements = 11;
        }

        let categories = new Set();
        if (requirements - 7 >= 0) {
            categories.add('i');
            requirements -= 7;
        }
        if (requirements - 3 >= 0) {
            categories.add('c');
            requirements -= 3;
        }
        if (requirements - 1 >= 0) {
            categories.add('m');
            requirements -= 1;
        }


        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            style={{color: colors['m']}}
                            onChange={this.handleChange(1)}
                            value={this.props.translate('home.filterChips.media')}
                            checked={categories.has('m')}
                        />
                    }
                    label={this.props.translate('home.filterChips.media')}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                    control={
                        <Checkbox
                            style={{color: colors['c']}}
                            onChange={this.handleChange(3)}
                            value={this.props.translate('home.filterChips.company')}
                            checked={categories.has('c')}
                        />
                    }
                    label={this.props.translate('home.filterChips.company')}
                />
                &nbsp;&nbsp;
                <FormControlLabel
                    control={
                        <Checkbox
                            style={{color: colors['i']}}
                            onChange={this.handleChange(7)}
                            value={this.props.translate('home.filterChips.owner')}
                            checked={categories.has('i')}
                        />
                    }
                    label={this.props.translate('home.filterChips.owner')}
                />
            </FormGroup>
        );
    }
}

CheckboxLabels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);
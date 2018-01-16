import React from 'react';
import MaterialSearchGraph from './MaterialSearchGraph'


class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.initialValue || ''
        }
    }


    logChange = (val) => {
        let entity;
        if (val) {
            entity = this.props.data.entities.names[val]
        }
        if (entity) {
            this.props.onChange(entity)
        }
    }

    logInputChange = (val) => {
        this.setState({
            value: val
        })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.clear > this.props.clear) {
            this.setState({
                value: ''
            })
        }
    }


    render() {

        const { autofocus, placeholder, onBlur, sizes } = this.props

        return (
            <MaterialSearchGraph
                suggestions={this.props.data.optionsData}
                placeholder={placeholder}
                onChange={this.logChange}
                onInputValueChange={this.logInputChange}
                propsValue={this.state.value}
                autofocus={autofocus}
                onBlur={onBlur}
                sizes={sizes}
            />
        );
    }
}

export default SearchBar;

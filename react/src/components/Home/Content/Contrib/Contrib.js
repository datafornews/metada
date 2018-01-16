import React, { Component } from 'react';
import EditGraph from './EditGraph/EditGraph'

class Contrib extends Component {
    render() {

        return this.props.show.contrib
            ?
            <EditGraph {...this.props} />
            :
            ''

    }
}

export default Contrib;
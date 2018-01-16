import React, { Component } from 'react';
import HomePaper from '../../../Paper/HomePaper'
import EditGraph from './EditGraph'

class EditGraphPaper extends Component {

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <HomePaper
                    {...this.props}
                    toggle={this.props.toggleEditGraph}
                    content={
                        <div style={{ textAlign: 'center' }}>
                            <EditGraph {...this.props}/>
                        </div>
                    } />
            </div>
        );
    }
}

export default EditGraphPaper;
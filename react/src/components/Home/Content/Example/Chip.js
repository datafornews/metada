import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const chipStyle = {
    display: 'inline-flex',
    marginRight: '5px',
    marginLeft: '5px',
    marginTop:'24px'
};

export default class MyChip extends Component {

    handleClick = () => {
        this.props.handleChipClick(this.props.entity)
    }

    render() {
        
        const avatarNameArray = this.props.entity.name.split(' ');
        let avatarName = '';
        for (let subName of avatarNameArray) {
            avatarName += subName[0].toUpperCase();
        }
        avatarName = avatarName.slice(0,3);
        return (
            <Chip
                avatar={<Avatar>{avatarName}</Avatar>}
                label={this.props.entity.name}
                onClick={this.handleClick}
                style={chipStyle}
            />
        )
    }
}

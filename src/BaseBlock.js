import React, { Component } from 'react';
import Block from './Block';

export default class BaseBlock extends Component {
    render() {
        return (
            <div>
                <Block id={this.props.block.id} block={this.props.block} />
            </div>
        );
    }
}

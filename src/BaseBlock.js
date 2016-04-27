import React, { Component } from 'react';
import Block from './Block';

export default class BaseBlock extends Component {
    render() {
        const block_str = this.props.block.reduce((str, curr) => {
            if (curr === this.props.ntDelim)
                return str + '[ ]'
            else
                return str + curr
        })

        return (
            <div>
                <Block
                    key={this.props.key}
                    block={this.props.block}
                    blockIndex={0}
                    innerBlockIndex={-1}
                    ntDelim={this.props.ntDelim}
                    isBaseBlock={true} />
                <p>{block_str}</p>
            </div>
        );
    }
};

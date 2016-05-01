import React, { Component } from 'react';
import Block from './Block';

export default class BlockList extends Component {
  render() {
    const blocks = this.props.blocks.map((block) => {
      return <Block key={block.id}
                    id={block.id}
                    block={block}
                    onSwapBlocks={this.props.onSwapBlocks}
                    onMoveBlock={this.props.onMoveBlock} />
    })

    return (
      <div>
        {blocks}
      </div>
    );
  }
}

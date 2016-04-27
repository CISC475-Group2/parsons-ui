import React, { Component } from 'react';
import Block from './Block';

export default class BlockList extends Component {
  render() {
    let blockIndex = -1
    const blocks = this.props.blocks.map((block) => {
      blockIndex++
      return (
          <Block
            blockIndex={blockIndex}
            innerBlockIndex={-1}
            block={block}
            ntDelim={this.props.ntDelim}
            isBaseBlock={false}
           />
      )
    })

    return (
      <div>
        {blocks}
      </div>
    );
  }
};

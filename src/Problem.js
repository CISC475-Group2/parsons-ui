import React, { Component } from 'react';
import DragSource from 'react-dnd';
import Block from './Block';
import BlockList from './BlockList';
import { DragDropContext } from 'react-dnd';
import { getBaseBlockStr, reset } from './Store'
import HTML5Backend from 'react-dnd-html5-backend';

class Problem extends Component {
  render() {
    return (
      <div>
        <h1>Problem 4</h1>
        <button onClick={reset}>Reset</button>
        <h3>{this.props.baseBlockStr}</h3>
        <Block block={this.props.baseBlock} />
        <div className="available-blocks-space">
            <h3>Available Blocks</h3>
            <BlockList blocks={this.props.blocks} />
        </div>
      </div>
    );
  }
};

export default DragDropContext(HTML5Backend)(Problem);

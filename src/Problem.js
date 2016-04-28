import React, { Component } from 'react';
import DragSource from 'react-dnd';
import Block from './Block';
import BaseBlock from './BaseBlock';
import BlockList from './BlockList';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Problem extends Component {
  render() {
    return (
      <div>
        <h1>Problem 4</h1>
        <BaseBlock block={this.props.baseBlock} />
        <h3>Available Blocks</h3>
        <BlockList blocks={this.props.blocks} />
      </div>
    );
  }
};

export default DragDropContext(HTML5Backend)(Problem);

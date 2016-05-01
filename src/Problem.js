import React, { Component } from 'react';
import { DragSource, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Block from './Block';
import BlockList from './BlockList';
import AvailableBlocksSpace from './AvailableBlocksSpace'

class Problem extends Component {
    render() {
        return (
            <div className="problem col-lg-12">
                <div className="page-header">
                      <h1>Problem 4</h1>
                </div>
                <pre className="code-space">{this.props.baseBlockString}</pre>
                <pre>
                <Block block={this.props.baseBlock}
                       onMoveBlock={this.props.onMoveBlock}
                       onSwapBlocks={this.props.onSwapBlocks} />
                <AvailableBlocksSpace onMoveBlock={this.props.onMoveBlock}>
                    <BlockList blocks={this.props.blocks}
                               onSwapBlocks={this.props.onSwapBlocks}
                               onMoveBlock={this.props.onMoveBlock} />
                </AvailableBlocksSpace>
                </pre>
                <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default" onClick={this.props.onReset.bind(this)}>Reset</button>
                    <button type="button" className="btn btn-default" >Submit</button>
                </div>
            </div>
        );
    }
};

export default DragDropContext(HTML5Backend)(Problem);

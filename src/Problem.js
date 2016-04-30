import React, { Component } from 'react';
import DragSource from 'react-dnd';
import Block from './Block';
import BlockList from './BlockList';
import AvailableBlocksSpace from './AvailableBlocksSpace'
import { DragDropContext } from 'react-dnd';
import { getBaseBlockStr, reset, submit } from './Store'
import HTML5Backend from 'react-dnd-html5-backend';

class Problem extends Component {
    render() {
        return (
            <div className="problem col-lg-12">
                <div className="page-header">
                      <h1>Problem 4</h1>
                </div>
                <pre className="code-space">{this.props.baseBlockStr}</pre>
                <pre>
                <Block block={this.props.baseBlock} />
                <AvailableBlocksSpace>
                    <BlockList blocks={this.props.blocks} />
                </AvailableBlocksSpace>
                </pre>
                <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default" onClick={reset}>Reset</button>
                    <button type="button" className="btn btn-default" onClick={submit}>Submit</button>
                </div>
            </div>
        );
    }
};

export default DragDropContext(HTML5Backend)(Problem);

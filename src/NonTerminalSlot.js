import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import { moveBlock } from './Store'

const squareTarget = {
    drop(props, monitor) {
        let source = monitor.getItem();
        moveBlock(source.blockIndex, source.innerBlockIndex, source.isBaseBlock, props.blockIndex, props.innerBlockIndex, props.isBaseBlock);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

export default class NonTerminalSlot extends Component {
    render() {
        const { connectDropTarget, isOver } = this.props;
        let style = {}

        if (isOver) {
            style= {
                backgroundColor: '#5EFA6F',
            }
        }

        return connectDropTarget(
            <span style={style} className="non-terminal">{ this.props.children }</span>
        )
    }
};

export default DropTarget(ItemTypes.BLOCK, squareTarget, collect)(NonTerminalSlot);

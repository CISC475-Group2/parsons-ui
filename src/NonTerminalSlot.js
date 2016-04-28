import React, { Component } from 'react'
import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'
import Block from './Block'
import { dragAndDropBlock } from './Store'

const squareTarget = {
    drop(props, monitor) {
        let source = monitor.getItem()
        dragAndDropBlock(source.id, props.id)
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
        const { connectDropTarget, isOver, block } = this.props
        const child = block.child
        let style = {}

        if (isOver) {
            style= {
                backgroundColor: '#5EFA6F',
            }
        }

        return child ?
            <span><Block id={child.id} block={child} /></span> :
            connectDropTarget(<span style={style} className="non-terminal"></span>)

    }
};

export default DropTarget(ItemTypes.BLOCK, squareTarget, collect)(NonTerminalSlot)

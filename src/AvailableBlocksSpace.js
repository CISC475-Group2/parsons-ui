import React, { Component } from 'react'
import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'
import Block from './Block'
import { dragAndDropBlock } from './Store'

const availableBlocksSpaceTarget = {
    drop(props, monitor) {
        let source = monitor.getItem()
        dragAndDropBlock(source.id, -1)
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

export default class AvailableBlocksSpace extends Component {
    render() {
        const { connectDropTarget, isOver, children } = this.props
        let style = {}

        return connectDropTarget(<div style={style} className="available-blocks-space">{this.props.children}</div>)

    }
};

export default DropTarget(ItemTypes.BLOCK, availableBlocksSpaceTarget, collect)(AvailableBlocksSpace)

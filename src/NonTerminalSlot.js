import React, { Component } from 'react'
import { ItemTypes } from './Constants'
import { DropTarget } from 'react-dnd'
import Block from './Block'

const squareTarget = {
    drop(props, monitor) {
        props.onMoveBlock(monitor.getItem().id, props.id)
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

export default class NonTerminalSlot extends Component {
    render() {
        const { connectDropTarget, isOver, block } = this.props
        const child = block.children[0]
        let style = {}

        if (isOver) {
            style= {
                backgroundColor: '#AEF0AF',
            }
        }

        return child ?
            <span><Block id={child.id}
                         block={child}
                         onMoveBlock={this.props.onMoveBlock}
                         onSwapBlocks={this.props.onSwapBlock} /></span> :
            connectDropTarget(<span style={style} className="non-terminal"></span>)

    }
}

export default DropTarget(ItemTypes.BLOCK, squareTarget, collect)(NonTerminalSlot)

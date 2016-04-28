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
        let style = {}

        if (isOver) {
            style= {
                backgroundColor: '#5EFA6F',
            }
        }

        let children = this.props.block.children.map(b => {
            return <Block id={b.id} block={b} />
        })

        let ntComponent = (() => {
            return children.length ?
                <span> {children} </span> :
                <span style={style} className="non-terminal"></span>
        })()

        return connectDropTarget(ntComponent)
    }
};

export default DropTarget(ItemTypes.BLOCK, squareTarget, collect)(NonTerminalSlot)

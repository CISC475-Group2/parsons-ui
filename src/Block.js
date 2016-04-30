import React, { Component } from 'react';
import NonTerminalSlot from './NonTerminalSlot';
import { ItemTypes } from './Constants';
import { DragSource, DropTarget } from 'react-dnd';
import { dragAndDropSwapBlocks } from './Store'

const blockSource = {
    beginDrag(props) {
        return {
            id: props.id
        }
    }
}

const blockTarget = {
    drop(props, monitor) {
        if (monitor.isOver({shallow: false})) {
            let source = monitor.getItem()
            console.log(source.id)
            console.log(props.id)
            dragAndDropSwapBlocks(source.id, props.id)
        }
    }
}

function dragSourceCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function dropTargetCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}

export default class Block extends Component {
    render() {
        const { connectDragSource, connectDropTarget, isDragging, block } = this.props;
        let hasNonTerminals = false

        let blockStuff = {}
        if (block.type === 'NON_TERMINAL') {
            blockStuff = <NonTerminalSlot id={block.id} block={block} />
        } else {
            blockStuff = block.children.map((c) => {
                switch (c.type) {
                    case 'NON_TERMINAL':
                        hasNonTerminals = true
                        return <NonTerminalSlot id={c.id} block={c} />
                    case 'TEXT':
                        return <span>{c.text}</span>
                }
            });
        }

        let className = "block "
        if (hasNonTerminals)
            className += "has-non-terminals "
        if (block.draggable)
            className += "draggable "

        let blockRender = <div
                key={this.props.id}
                className={className}
                style={{
                    opacity: isDragging ? 0.5 : 1
                }}
                >
                {blockStuff}
            </div>

        if (this.props.block.draggable) {
            return connectDragSource(connectDropTarget(blockRender))
        } else {
            return blockRender
        }
    }
};

export default DropTarget(ItemTypes.BLOCK, blockTarget, dropTargetCollect)(DragSource(ItemTypes.BLOCK, blockSource, dragSourceCollect)(Block));

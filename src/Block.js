import React, { Component } from 'react';
import NonTerminalSlot from './NonTerminalSlot';
import { ItemTypes } from './Constants';
import { DragSource, DropTarget } from 'react-dnd';

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
            props.onSwapBlocks(monitor.getItem().id, props.id)
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
            blockStuff = <NonTerminalSlot key={block.id}
                                          id={block.id}
                                          block={block}
                                          onSwapBlocks={this.props.onSwapBlocks}
                                          onMoveBlock={this.props.onMoveBlock} />
        } else {
            blockStuff = block.children.map((c) => {
                switch (c.type) {
                    case 'NON_TERMINAL':
                        hasNonTerminals = true
                        return <NonTerminalSlot key={c.id}
                                                id={c.id}
                                                block={c}
                                                onSwapBlocks={this.props.onSwapBlocks}
                                                onMoveBlock={this.props.onMoveBlock} />
                    case 'TEXT':
                        return <span key={c.id}>{c.text}</span>
                }
            });
        }

        let className = "block "
        if (hasNonTerminals)
            className += "has-non-terminals "
        if (block.draggable)
            className += "draggable "

        let blockRender = <div className={className}
                               style={{ opacity: isDragging ? 0.5 : 1 }} >
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

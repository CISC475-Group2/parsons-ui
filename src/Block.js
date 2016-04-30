import React, { Component } from 'react';
import NonTerminalSlot from './NonTerminalSlot';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const blockSource = {
    beginDrag(props) {
        return {
            id: props.id
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default class Block extends Component {
    render() {
        const { connectDragSource, isDragging, block } = this.props;
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
            return connectDragSource(blockRender)
        } else {
            return blockRender
        }
    }
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(Block);

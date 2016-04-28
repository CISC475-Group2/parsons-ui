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

    let blockStuff = block.children.map((c) => {
        switch (c.type) {
            case 'NON_TERMINAL':
                return <NonTerminalSlot id={c.id} block={c} />
            case 'TEXT':
                return <span>{c.text}</span>

        }
    });

    return connectDragSource(
        <div
            key={this.props.id}
            className="block"
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
            >
            {blockStuff}
        </div>
    );
    }
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(Block);

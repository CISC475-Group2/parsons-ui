import React, { Component } from 'react';
import NonTerminalSlot from './NonTerminalSlot';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const blockSource = {
    beginDrag(props) {
        return {
            blockIndex: props.blockIndex,
            innerBlockIndex: props.innerBlockIndex,
            isBaseBlock: props.isBaseBlock
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

    const { connectDragSource, isDragging, block, blockIndex, ntDelim, isBaseBlock } = this.props;

    let innerBlockIndex = -1;
    let delimitedBlock = block.map((s) => {
        innerBlockIndex++
        if (s === ntDelim) {
            return <NonTerminalSlot
                       innerBlockIndex={innerBlockIndex}
                       blockIndex={blockIndex}
                       isBaseBlock={isBaseBlock} />
        } else if (s.slice(0, ntDelim.length) === ntDelim) {
            return <Block
                       block={[s.slice(ntDelim.length, s.length)]}
                       innerBlockIndex={innerBlockIndex}
                       blockIndex={blockIndex}
                       isBaseBlock={isBaseBlock}
                       ntDelim={ntDelim}
                       connectDragSource={connectDragSource}
                       isDragging={isDragging} />
        } else {
            return <span>{s}</span>
        }
    });

    return connectDragSource(
        <div
            key={this.props.blockIndex}
            className="block"
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
            >
            {delimitedBlock}
        </div>
    );
    }
};

export default DragSource(ItemTypes.BLOCK, blockSource, collect)(Block);

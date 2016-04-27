const data = {
  "base_block": ["-(", "<nt>", ", ", "<nt>", ")"],
  "blocks": [["+(", "<nt>22", ", ", "<nt>", ")"], ["2"], ["3"], ["2"]]
}

let observer = null;

function emitChange() {
    observer(data);
}

export function moveBlock(sourceBlockIndex, sourceInnerBlockIndex, sourceIsBaseBlock, targetBlockIndex, targetInnerBlockTarget, targetIsBaseBlock) {
    console.log(arguments)

    // If the source block is an inner block
    if (sourceInnerBlockIndex > -1) {
    } else {
        // Remove the source block from data
        const sourceBlockText = data.blocks.splice(sourceBlockIndex, 1)[0]
    }
    emitChange();
}

export function observe(o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.');
    }

    observer = o;
    emitChange();
}

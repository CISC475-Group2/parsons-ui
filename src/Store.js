import { initialState, moveBlock, blockToStr } from './StateManager'

const initialData = {
  "base_block": ["-(", "<nt>", ", ", "<nt>", ")"],
  "blocks": [["+(", "<nt>", ", ", "<nt>", ")"], ["2"], ["3"], ["2"]]
}

let state = initialState(initialData)
let observer = null;

function emitChange() {
    observer(state);
}

export function dragAndDropBlock(sourceId, targetId) {
    state = moveBlock(state, sourceId, targetId)
    emitChange();
}

export function getBaseBlockStr() {
    let str = blockToStr(state.blocks[0])
    console.log(str)
    return str
}

export function observe(o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.');
    }

    observer = o;
    emitChange();
}


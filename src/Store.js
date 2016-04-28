import { initialState, moveBlock } from './BlockState'

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
    console.log(sourceId)
    console.log(targetId)
    state = moveBlock(state, sourceId, targetId)
    emitChange();
}

export function observe(o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.');
    }

    observer = o;
    emitChange();
}


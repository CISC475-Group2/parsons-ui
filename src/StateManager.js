import IdTracker from './IdTracker'

const ntRegex = /<nt>/g
const ntClosingRegex = /<\/nt>/g

function createTerminalBlock(idTracker, draggable, blocksData) {
    return {
        id: idTracker.generateUniqueId(),
        type: 'TERMINAL',
        draggable: draggable,
        children: blocksData.map(block => {
            if (block === "<nt>") {
                return createNonTerminalBlock(idTracker, [])
            } else {
                return  {
                    type: 'TEXT',
                    text: block
                }
            }
        })
    }
}

function createNonTerminalBlock(idTracker, children=[]) {
    return {
        id: idTracker.generateUniqueId(),
        type: 'NON_TERMINAL',
        draggable: false,
        children: children
    }
}

function findBlockById(blocks, id, willDelete=false) {
    let ret = -1
    for (var i = 0; i < blocks.length; i++) {
        var b = blocks[i]
        // If we find the actual block
        if (b.id === id) {
            if (willDelete) {
                blocks.splice(i, 1)
            }
            ret = b
            return ret
        }
        else if (b.children && b.children.length && typeof b.children === "object") {
            ret = findBlockById(b.children, id, willDelete)
            if (ret.id === id) {
                return ret
            }
        }
    }

    return ret
}

function deleteBlockById(blocks, id) {
    return findBlockById(blocks, id, true)
}

export function blockToStr(block) {
    return block.children.reduce((str, curr) => {
        if (curr.children && curr.children.length > 0) {
            return str + blockToStr(curr)
        } else {
            if (curr.type === "NON_TERMINAL") {
                return str + "<nt>"
            } else {
                return str + curr.text
            }
        }
    }, "")
}

// Returns the new state after moving a block.
export function moveBlock(state, sourceId, targetId) {

    let newState = state
    let targetBlock = findBlockById(newState.blocks, targetId)

    if (targetBlock.type !== "NON_TERMINAL") {
        console.log("Can't drag into a terminal!")
        return state
    }

    targetBlock.children.push(deleteBlockById(newState.blocks, sourceId))
    return newState
}

export function initialState(data) {
    let state = { blocks: [] }
    let idTracker = new IdTracker()
    state.blocks.push(createTerminalBlock(idTracker, false, data.base_block))
    state.blocks = state.blocks.concat(data.blocks.map(block => {
        return createTerminalBlock(idTracker, true, block)
    }))

    state.getBaseBlock = () => {
        return state.blocks[0]
    }

    state.getBlocks = () => {
        return state.blocks.slice(1, state.blocks.length)
    }

    return state
}

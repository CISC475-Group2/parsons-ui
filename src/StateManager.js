import IdTracker from './IdTracker'

const ntRegex = /<nt>/g
const ntClosingRegex = /<\/nt>/g

function createTerminalBlock(idTracker, draggable, blocksData) {
    const id = idTracker.generateUniqueId()

    return {
        id: id,
        type: 'TERMINAL',
        draggable: draggable,
        children: blocksData.map(block => {
            if (block === "<nt>") {
                return createNonTerminalBlock(idTracker, id, [])
            } else {
                return  {
                    type: 'TEXT',
                    text: block
                }
            }
        })
    }
}

function createNonTerminalBlock(idTracker, parentId, children=[]) {
    return {
        id: idTracker.generateUniqueId(),
        parentId: parentId,
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
    return block.children.reduce((str, curr, index) => {
        if (curr.children && curr.children.length > 0) {
            return str + blockToStr(curr)
        } else {
            if (curr.type === "NON_TERMINAL") {
                return str + "◌ "
            } else {
                if (curr.text === "(") {
                    return str + curr.text
                } else if (curr.text === ")") {
                    // If there is an extra space, we remove it.
                    if (str[str.length - 1] === " ") {
                        return str.slice(0, str.length - 1) + curr.text + " "
                    } else {
                        return str + curr.text + " "
                    }
                } else {
                    return str + curr.text + " "
                }
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

    if (targetBlock.parentId === sourceId) {
        console.log("Can't drag into oneself!")
        return state
    }

    targetBlock.children.push(deleteBlockById(newState.blocks, sourceId))
    return newState
}

export function initialState(data) {
    let state = { blocks: [] }
    let idTracker = new IdTracker()
    state.blocks.push(createTerminalBlock(idTracker, false, data.blocks[0]))

    state.blocks = state.blocks.concat(data.blocks.slice(1, data.blocks.length).map(block => {
        return createTerminalBlock(idTracker, true, block)
    }))

    state.getBaseBlock = () => {
        return state.blocks[0]
    }

    state.getBaseBlockStr = () => {
        return blockToStr(state.blocks[0])
    }

    state.getBlocks = () => {
        return state.blocks.slice(1, state.blocks.length)
    }

    return state
}

import IdTracker from './IdTracker'
import { ntRegex, ntClosingRegex } from './Constants'

const initialData = {
    "blocks" : [["(", "<nt>", "<nt>", "<nt>", ")"], ["-"], ["2"], ["(", "<nt>", "<nt>", ")"], ["3"], ["2"]]
}

export default function blockApp(state=makeInitialState(initialData), action) {
    let newBlocks
    switch (action.type) {
        case 'MOVE_BLOCK':
            newBlocks = moveBlock(state.blocks, action.sourceId, action.targetId)

            return {
                ...state,
                baseBlockString: blockToStr(newBlocks[0]),
                blocks: newBlocks
            }
        case 'SWAP_BLOCKS':
            newBlocks = swapBlocks(state.blocks, action.sourceId, action.targetId)

            return {
                ...state,
                baseBlockString: blockToStr(newBlocks[0]),
                blocks: newBlocks
            }
        case 'SUBMIT':
            return state
        case 'RESET':
            return makeInitialState(initialData)
        default:
            return state
    }
}

export function makeInitialState(data) {
    let state = {
        baseBlockString: '',
        blocks: []
    }
    let idTracker = new IdTracker()
    state.blocks.push(createTerminalBlock(idTracker, -1, false, data.blocks[0]))
    state.blocks = state.blocks.concat(data.blocks.slice(1, data.blocks.length).map(block => {
        return createTerminalBlock(idTracker, -1, true, block)
    }))

    state.baseBlockString = blockToStr(state.blocks[0])

    return state
}


function createTerminalBlock(idTracker, parentId, draggable, blocksData) {
    const id = idTracker.generateUniqueId()

    return {
        id: id,
        parentId: parentId,
        type: 'TERMINAL',
        draggable: draggable,
        children: blocksData.map(block => {
            if (block === "<nt>") {
                return createNonTerminalBlock(idTracker, id, [])
            } else {
                return  {
                    id: idTracker.generateUniqueId(),
                    parentId: id,
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


// Wrapper function to encapsulate findBlockById
function deleteBlockById(blocks, id) {
    return findBlockById(blocks, id, true)
}

function blockToStr(block) {
    let bts = (block) => {
        return block.children.reduce((str, curr, index) => {
            if (curr.children && curr.children.length > 0) {
                return str + bts(curr)
            } else {
                if (curr.type === "NON_TERMINAL") {
                    return str + "◌ "
                } else {
                    if (curr.text === "(") {
                        return str + curr.text
                    } else if (curr.text === ")") {
                        // If there is an extra space before the ), we remove it.
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

    return bts(block).trim()
}


function moveBlock(blocks, sourceId, targetId) {
    let newBlocks = blocks.slice(0)

    // If dragging into an AvailableBlocksSpace...
    if (targetId === -1) {
        let sourceBlock = deleteBlockById(newBlocks, sourceId)
        sourceBlock.parentId = -1
        newBlocks.push(sourceBlock)
        return newBlocks
    }

    let targetBlock = findBlockById(newBlocks, targetId)

    if (targetBlock.type !== "NON_TERMINAL") {
        console.log("Can't drag into a terminal!")
        return newBlocks
    }

    if (targetBlock.parentId === sourceId) {
        console.log("Can't drag into oneself!")
        return newBlocks
    }

    let sourceBlock = deleteBlockById(newBlocks, sourceId)
    sourceBlock.parentId = targetBlock.id
    targetBlock.children.push(sourceBlock)

    return newBlocks
}

function getParentChildren(blocks, id) {
    let b = findBlockById(blocks, id)
    if (b.parentId === -1) {
        return -1
    } else {
        return findBlockById(blocks, b.parentId).children
    }
}

function swapBlocks(blocks, sourceId, targetId) {
    let newBlocks = blocks.slice(0)
    let sourceBlock = findBlockById(newBlocks, sourceId)
    let targetBlock = findBlockById(newBlocks, targetId)

    let sourceContainer = getParentChildren(newBlocks, sourceId)
    let targetContainer = getParentChildren(newBlocks, targetId)

    return newBlocks
}


const initialData = {
  "base_block": ["-(", "<nt>", ", ", "<nt>", ")"],
  "blocks": [["+(", "<nt>", ", ", "<nt>", ")"], ["2"], ["3"], ["2"]]
}

class IdTracker {
  constructor() {
    this.id = 0
  }
  generateUniqueId() {
    const oldId = this.id
    this.id = this.id + 1
    return oldId
  }
}

const ntRegex = /<nt>/g
const ntClosingRegex = /<\/nt>/g

function createBlock(idTracker, type, draggable, children) {
  return {
    id: idTracker.generateUniqueId(),
    type: type,
    draggable: draggable,
    children: children
  }
}

function createComponentsFromBlocksArray(idTracker, arr) {
  return arr.map(block => {
    if (block === "<nt>") {
      return createBlock(idTracker, 'NON_TERMINAL', false, [])
    } else {
      return  {
        type: 'TEXT',
        text: block[0]
      }
    }
  })
}

function initialState(data) {
  let state = { blocks: [] }
  let idTracker = new IdTracker()
  state.blocks.push(createBlock(idTracker, 'TERMINAL', false, createComponentsFromBlocksArray(idTracker, data.base_block)))
  state.blocks = state.blocks.concat(data.blocks.map(block => {
    return createBlock(idTracker, 'TERMINAL', true, createComponentsFromBlocksArray(idTracker, block))
  }))

  return state
}

function findBlockById(blocks, id, willDelete=false) {
    var ret = -1
    for (var i = 0; i < blocks.length; i++) {
        var b = blocks[i]
        if (b.id === id) {
        		if (willDelete) {
            	blocks.splice(i, 1)
            }
            ret = b
            return ret
        } else if (b.children && b.children.length && typeof b.children === "object") {
            ret = findBlockById(b.children, id)
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

// Returns the new state after moving a block.
function moveBlock(state, sourceId, targetId) {
  console.log("Moving " + sourceId + " to children of " + targetId)
  let newState = state
  let sourceBlock = deleteBlockById(newState.blocks, sourceId)
  let targetBlock = findBlockById(newState.blocks, targetId)
  targetBlock.children.push(sourceBlock)

  return newState
}

let state = initialState(initialData)
console.log(state)
state = moveBlock(state, 5, 1)
console.log(state)
state = moveBlock(state, 5, 0)
console.log(state)

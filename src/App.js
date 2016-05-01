import React, { Component } from 'react'
import { connect } from 'react-redux'
import Problem from './Problem'

class App extends Component {
    render() {
        const { blocks, actions } = this.props
        return (
            <div>
                <Problem baseBlockString={this.props.baseBlockString}
                         baseBlock={this.props.baseBlock}
                         blocks={this.props.blocks}
                         onSwapBlocks={this.props.onSwapBlocks}
                         onMoveBlock={this.props.onMoveBlock}
                         onReset={this.props.onReset} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        baseBlockString: state.baseBlockString,
        baseBlock: state.blocks[0],
        blocks: state.blocks.slice(1, state.blocks.length)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSwapBlocks: (sourceId, targetId) => {
            dispatch({ type: 'SWAP_BLOCKS', sourceId: sourceId, targetId: targetId })
        },
        onMoveBlock: (sourceId, targetId) => {
            dispatch({ type: 'MOVE_BLOCK', sourceId: sourceId, targetId: targetId })
        },
        onReset: () => {
            dispatch({ type: 'RESET' })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

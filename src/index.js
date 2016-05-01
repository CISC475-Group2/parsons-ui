import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App'
import blockApp from './BlockReducer'

const store = createStore(blockApp)

function renderApp() {
    console.log(store.getState())
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}
renderApp()
store.subscribe(renderApp)


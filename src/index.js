import React from 'react';
import ReactDOM from 'react-dom';
import Problem from './Problem';
import { observe } from './Store';

const delimiter = "<nt>"

observe(data => {
    console.log(data)
    ReactDOM.render(
        <Problem
            baseBlockStr={data.getBaseBlockStr()}
            baseBlock={data.getBaseBlock()}
            blocks={data.getBlocks()} />,
        document.getElementById('root')
    )
}
);

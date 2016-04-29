import React from 'react';
import ReactDOM from 'react-dom';
import Problem from './Problem';
import { observe } from './Store';

const delimiter = "<nt>"

observe(data => {
    ReactDOM.render(
        <Problem
            baseBlock={data.getBaseBlock()}
            blocks={data.getBlocks()} />,
        document.getElementById('root')
    )
}
);

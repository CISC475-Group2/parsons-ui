import React from 'react';
import ReactDOM from 'react-dom';
import Problem from './Problem';
import { observe } from './Store';

const delimiter = "<nt>"

observe(data =>
    ReactDOM.render(
        <Problem
            baseBlock={data.base_block}
            blocks={data.blocks}
            ntDelim={delimiter}/>,
        document.getElementById('root')
    )
);

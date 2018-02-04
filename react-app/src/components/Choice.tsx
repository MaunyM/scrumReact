import * as React from 'react';

import Join from './Join';
import Create from './Create';

import './Choice.css';

export default () => (
    <div className="choiceComponent">
        <Join/>
        <div>or</div>
        <Create/>
    </div>
);

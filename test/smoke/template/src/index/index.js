'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { common } from '../../common/index';
// import {a} from '../search/tree-shaking';
// import { Picker } from 'antd-mobile';

class Search extends React.Component {
    render() {
        return (
            <div className="search-text">
                index
                {common()}
            </div>
        )
    }
}

ReactDOM.render(<Search/>, document.getElementById('root'));

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import largeNumber from 'large-number';
// import {common} from '../../common/index'
// import {a, b, Person} from './tree-shaking';
// import { Picker } from 'antd-mobile/lib/picker';
// import { Picker } from 'antd-mobile';
// import './search.css'

class SearchA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            TextComponent: null
        }
    }

    loadComponent() {
        // 动态加载脚本
        import('./text.js').then((Text) => {
            console.log('Text', Text)
            this.setState({
                TextComponent: Text.default
            })
        });
    }


    render() {
        const {TextComponent} = this.state;
        largeNumber('1', '98')
        return (
            <div className="search-text">
                {TextComponent ? <TextComponent /> : null}
                <div onClick={this.loadComponent.bind(this)}>懒加载脚本</div>
            </div>
        )
    }
}

ReactDOM.render(<SearchA/>, document.getElementById('root'));

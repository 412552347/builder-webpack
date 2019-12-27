const React = require('react');
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './search.css'
require('./search.css');

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            TextComponent: null
        }
    }

    loadComponent() {
        console.log('111')
        // 动态加载脚本
        // import('./text.js').then((Text) => {
        //     this.setState({
        //         TextComponent: Text.default
        //     })
        // });
    }


    render() {
        const {TextComponent} = this.state;
        return (
            <div className="search-text">
                {TextComponent ? <TextComponent /> : null}
                <div onClick={this.loadComponent.bind(this)}>懒加载脚本</div>
            </div>
        )
    }
}

module.exports = <Search/>;

// ReactDOM.render(<SearchA/>, document.getElementById('root'));

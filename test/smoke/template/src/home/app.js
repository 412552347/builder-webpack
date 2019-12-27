import React from 'react';

class App extends React.Component {
    handleClick() {
        console.log('111')
    }
    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>服务端渲染</div>
        )
    }
}

export default App;

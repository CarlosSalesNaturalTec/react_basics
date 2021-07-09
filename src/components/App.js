import React from 'react';

class App extends React.Component{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div className="box">
                    <div className="date">Data atual : {this.props.date}</div>
                    <div className="author">Developer: {this.props.author}</div>
                    <p></p>
                </div>
            </div>
        );
    }
}

export default App;

import React from 'react';

class App2 extends React.Component{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div className="box">
                    <div className="title">Título: {this.props.title}</div>
                    <div className="content">Texto: {this.props.children}</div>
                    <p></p>
                </div>
            </div>
        );
    }
}

export default App2;

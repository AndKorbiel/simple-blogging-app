import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class Display extends Component {
    render() {

        let content;

        if (this.props.displayMode === 'writer') {
            content = <div> <h1>{this.props.title}</h1> <h5>{this.props.text}</h5></div>
        }

        else {
            content = <div className="articles row">
                {this.props.articlesInDatabase.map(article => {
                    return (
                        <div className="article col-md-3" key={article.id}>
                            <h3>{article.title}</h3>
                            <p>{article.content}</p>
                        </div>
                    )
                })}
            </div>
        }

        return (
            <div className=" col-md-12" id="screen">
                <p className="notification">{this.props.notification}</p>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articlesInDatabase: state.articlesInDatabase,
        notification: state.notification,
        status: state.status,
        title: state.title,
        content: state.content,
        displayMode: state.displayMode
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getData: ()=> {
//             const action = { type: 'GET_DATA'};
//             dispatch(action)
//         },
//         handleChange: ()=> {
//             const action = { type: 'GET_DATA'};
//             dispatch(action)
//         }
//     }
// };

export default connect(mapStateToProps)(Display);
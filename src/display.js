import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class Display extends Component {
    render() {

        /* Is that part ok???? */
        let content;
         
        if (this.props.displayMode === 'Writer') {
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
        /* Until this */
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
        text: state.text,
        content: state.content,
        displayMode: state.displayMode
    }
};

export default connect(mapStateToProps)(Display);
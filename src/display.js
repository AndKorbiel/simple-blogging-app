import React, { Component } from 'react';
import './App.css';

class Display extends Component {
    render() {
        const { displayMode, title, text, notification, articlesInDatabase } = this.props;
        let content;

        if (displayMode === 'writer') {
            content = <div> <h1>{title}</h1> <h5>{text}</h5></div>
        }

        else {
            content = <div className="articles row">
                {articlesInDatabase.map(article => {
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
                <p className="notification">{notification}</p>
                {content}
            </div>
        )
    }
}

export default Display;
import React, { Component } from 'react';
import './App.css';

class Display extends Component {
    render() {
        const { title, text, notification, articlesInDatabase } = this.props;
        return (
            <div className="col-md-12" id="screen">
                <p className="notification">{notification}</p>
                <h1>{title}</h1>
                <h5>{text}</h5>
                <div className="articles row">
                    {articlesInDatabase.map(article => {
                        return (
                            <div className="article col-md-3" key={article.id}>
                                <h3>{article.title}</h3>
                                <p>{article.content}</p>
                            </div>

                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Display;
import React, { Component } from 'react';
import './App.css';

class Writer extends Component {
    render() {
        const { postArticle, title, text, handleChange, loggedIn } = this.props;

        return (
            <div className="col-md-12 col-lg-6">
                <div className="jumbotron">
                    <h1>Write</h1>
                    <h2>Write You own article</h2>
                    <form>
                        <input type="text" className="form-control" id="title" aria-label="Small" name="title"
                               aria-describedby="inputGroup-sizing-sm" placeholder="Title*" value={title} onChange={e => handleChange(e)} />
                        <textarea className="form-control" id="content" name="text"
                                  placeholder="Content goes here...*" value={text} onChange={e => handleChange(e)} />
                    </form>
                    <button className={(loggedIn ? "post" : "block") + " btn btn-primary btn-lg"} id="postArticles" onClick={()=> postArticle({title, text})}>Post article</button>
                </div>
            </div>
        )
    }
}

export default Writer;
import React, { Component } from 'react';
import "./App.css";

class Reader extends  Component {
    render() {
        const { search, get } = this.props;
        return(
            <div className="col-md-12 col-lg-6">
                <div className="jumbotron">
                    <h1>Read</h1>
                    <h2>Get all articles from database or search for them</h2>
                    <input type="text" className="form-control" id="search" aria-label="Small"
                           aria-describedby="inputGroup-sizing-sm" placeholder="Search by article title" />
                    <button className="btn btn-primary btn-lg" id="searchArticles">Search articles</button>
                    <button className="btn btn-primary btn-lg" id="getArticles" onClick={get}>Get all articles</button>
                </div>
            </div>
        )
    }
}

export default Reader;
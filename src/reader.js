import React, { Component } from 'react';
import "./App.css";

class Reader extends  Component {
    render() {
        const { handleChange, search, get } = this.props;
        return(
            <div className="col-md-12 col-lg-6">
                <div className="jumbotron">
                    <h1>Read</h1>
                    <h2>Get all articles from database or search for them</h2>
                    <input type="text" className="form-control" id="search" aria-label="Small" name="searchInput"
                           aria-describedby="inputGroup-sizing-sm" placeholder="Search by article title" onChange={(e)=> handleChange(e)} />
                    <button className="btn btn-primary btn-lg" id="searchArticles" onClick={search}>Search articles</button>
                    <button className="btn btn-primary btn-lg" id="getArticles" onClick={get}>Get all articles</button>
                </div>
            </div>
        )
    }
}

export default Reader;
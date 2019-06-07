import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./App.css";
import {getDataEffect, handleChangeEffect, searchEffect} from './redux';

class Reader extends  Component {

    render() {
        const doSth = () => {
            const searchInput = this.props.searchInput;
            this.props.searchData(searchInput);

        };

        return(
            <div className="col-md-12 col-lg-6">
                <div className="jumbotron">
                    <h1>Read</h1>
                    <h2>Get all articles from database or search for them</h2>
                    <input type="text" className="form-control" id="search" aria-label="Small" name="searchInput"
                           aria-describedby="inputGroup-sizing-sm" placeholder="Search by article title"  onChange={(e)=> this.props.handleChange(e)} />
                    <button className="btn btn-primary btn-lg" id="searchArticles" onClick={doSth}>Search articles</button>
                    <button className="btn btn-primary btn-lg" id="getArticles" onClick={this.props.getData}>Get all articles</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.title,
        text: state.text,
        searchInput: state.searchInput
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getData: ()=> dispatch(getDataEffect()),
        handleChange: (e) => {

            let value = {value: e.target.value, name: e.target.name};
            dispatch(handleChangeEffect(value));

            // if ((this.props.title != '' || this.props.text != '') && (e.target.name === 'title' || e.target.name === 'text')) {
            //     currentState = 'writer'
            // }

        },
        searchData: (searchText) => {
            dispatch(searchEffect(searchText));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Reader);
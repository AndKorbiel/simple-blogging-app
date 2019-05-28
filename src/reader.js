import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./App.css";
import axios from "axios";

class Reader extends  Component {
    render() {
        // const { handleChange, search, get } = this.props;
        return(
            <div className="col-md-12 col-lg-6">
                <div className="jumbotron">
                    <h1>Read</h1>
                    <h2>Get all articles from database or search for them</h2>
                    <input type="text" className="form-control" id="search" aria-label="Small" name="searchInput"
                           aria-describedby="inputGroup-sizing-sm" placeholder="Search by article title"  onChange={(e)=> this.props.handleChange(e)} />
                    <button className="btn btn-primary btn-lg" id="searchArticles" onClick={this.props.searchData}>Search articles</button>
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
        getData: ()=> {
            const action = { type: 'GET_DATA'};
            axios.get('http://localhost:8080/articles')
                .then((res) => {
                    dispatch({type: 'GET_DATA', payload: res.data});
                })
                .catch((err) => {
                    dispatch({type: 'GET_DATA_ERROR', payload: err})
                })
        },
        handleChange: (e) => {
            const action = {type: 'HANDLE_CHANGE'};
            let value = e.target.value;
            // if ((this.props.title != '' || this.props.text != '') && (e.target.name === 'title' || e.target.name === 'text')) {
            //     currentState = 'writer'
            // }
            dispatch({type: 'HANDLE_CHANGE', payload: value});
        },
        searchData: () => {
            let searchText = this.props.searchInput;
            const action = { type: 'SEARCH'};

            axios.get('http://localhost:8080/search'+'?q=' + searchText)
                .then((res) => {
                    window.location = '#search' +'?q=' + searchText;
                    if (res.length <= 0) {
                        dispatch({type: 'SEARCH_EMPTY', payload: res.data});
                    }
                    else {
                        dispatch({type: 'SEARCH', payload: res.data});
                    }
                })
                .catch((err) => {
                dispatch({type: 'GET_DATA_ERROR', payload: err})
            });

        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Reader);
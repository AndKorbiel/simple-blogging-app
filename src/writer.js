import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {handleChangeEffect, postArticleEffect} from "./redux";

class Writer extends Component {

    render() {
        const doSth =()=> {
            const title = this.props.title;
            const text = this.props.text;
            console.log(title, text)
            this.props.postArticle({title: title, text: text})
        };

        return (
            <div className="col-md-12 col-lg-6">
                <div className="jumbotron">
                    <h1>Write</h1>
                    <h2>Write You own article</h2>
                    <form>
                        <input type="text" className="form-control" id="title" aria-label="Small" name="title"
                               aria-describedby="inputGroup-sizing-sm" placeholder="Title*" onChange={e => this.props.handleChange(e)} />
                        <textarea className="form-control" id="content" name="text"
                                  placeholder="Content goes here...*" onChange={e => this.props.handleChange(e)} />
                    </form>
                    <button className={(this.props.loggedIn ? "post" : "block") + " btn btn-primary btn-lg"} id="postArticles" onClick={doSth}>Post article</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.title,
        text: state.text,
        loggedIn: state.loggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (e) => {

            let value = {value: e.target.value, name: e.target.name};
            dispatch(handleChangeEffect(value));

            // if ((this.props.title != '' || this.props.text != '') && (e.target.name === 'title' || e.target.name === 'text')) {
            //     currentState = 'writer'
            // }

        },
        postArticle: (article) => {
            console.log(article)
            dispatch(postArticleEffect(article));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Writer);
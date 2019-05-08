import React, { Component } from "react";
import Reader from './reader';
import Writer from "./writer";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

    state = {
        title: '',
        text: '',
        articleStatus: 'Working on it...',
        articlesInDatabase: [],
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    postArticle = () => {
        this.setState({
            articleStatus: 'Article posted!'
        })

    };

    getData =()=> {
        fetch('http://localhost:8080/articles')
            .then((res) => {
                return res.json()
            })
            .then((myJSON) => {
                if (myJSON.length <= 0) {
                    console.log('no art')
                }
                else {
                    this.setState({
                        articlesInDatabase: myJSON
                    })
                    console.log(this.state.articlesInDatabase)
                }
            })
            .catch(error => console.error('Error:', error));
    };

    searchData = () => {

    };

  render() {
      const {title, text, articlesInDatabase} = this.state;
      return (
          <div className="App">
              <div className="container">
                  <div className="row">
                      <Reader getData={this.getData} search={this.searchData} get={this.getData}/>
                      <Writer postArticle={this.postArticle} handleChange={this.handleChange} title={title} text={text} />
                  </div>
                <div className="row">
                  <div className="col-md-6" id="screen">
                      <p>Article posting status: {this.state.articleStatus}</p>
                      <h1>{this.state.title}</h1>
                      <h5>{this.state.text}</h5>
                      <ul className="articles">
                          {articlesInDatabase.map(article => {
                              return (
                              <li key={article}>{article.title}</li>
                              )
                          })}
                      </ul>
                  </div>
                  </div>
              </div>
          </div>
      );
  }

}

export default App;

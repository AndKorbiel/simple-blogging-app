import React, { Component } from "react";
import Reader from './reader';
import Writer from "./writer";
import Display from './display';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

    state = {
        title: '',
        text: '',
        notification: '',
        articlesInDatabase: [],
        searchInput: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    postArticle = () => {
        this.setState({
            notification: 'Article posted!'
        })

    };

    getData =()=> {
        fetch('http://localhost:8080/articles')
            .then((res) => {
                return res.json()
            })
            .then((myJSON) => {
                if (myJSON.length <= 0) {
                    this.setState({
                        notification: 'There isn\'t any article in our database',
                        articlesInDatabase: []
                    })
                }
                else {
                    this.setState({
                        notification: '',
                        articlesInDatabase: myJSON
                    });

                }
            })
            .catch(error => console.error('Error:', error));
    };

    searchData = () => {
        let searchText = this.state.searchInput;

        fetch('http://localhost:8080/search'+'?q=' + searchText)
            .then((res) => {
                window.location = '#search' +'?q=' + searchText;
                return res.json();
            })
            .then((myJSON) => {
                if (myJSON.length <= 0) {
                    this.setState({
                        notification: 'There isn\'t such article in database',
                        articlesInDatabase: []
                    })
                }
                else {
                    this.setState({
                        notification: '',
                        articlesInDatabase: myJSON
                    })
                }
            })
            .catch(error => console.error('Error:', error));
    };

  render() {
      const {title, text, notification, articlesInDatabase} = this.state;
      return (
          <div className="App">
              <div className="container">
                  <div className="row">
                      <Reader getData={this.getData} handleChange={this.handleChange} search={this.searchData} get={this.getData}/>
                      <Writer postArticle={this.postArticle} handleChange={this.handleChange} title={title} text={text} />
                  </div>
                <div className="row">
                    <Display title={title} text={text} notification={notification} articlesInDatabase={articlesInDatabase}  />
                </div>
              </div>
          </div>
      );
  }

}

export default App;

import React, { Component } from "react";
import Reader from './reader';
import Writer from "./writer";
import Display from './display';
import TopBar from './topbar';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

    state = {
        title: '',
        text: '',
        notification: '',
        articlesInDatabase: [],
        searchInput: '',
        displayMode: ''
    };

    handleChange = (e) => {
        let currentState;

        if ((this.state.title != '' || this.state.text != '') && (e.target.name === 'title' || e.target.name === 'text')) {
            currentState = 'writer'
        }

        this.setState({
            [e.target.name]: e.target.value,
            displayMode: currentState
        })
    };

    postArticle = () => {
        let postedData = {title: this.state.title, content: this.state.text};

        if (postedData.title == '' || postedData.content == '') {
            this.setState({
                notification: 'Please fill all matandory fields'
            })
        }

        else {
            fetch('http://localhost:8080/articles', {
                method: 'POST',
                body: JSON.stringify(postedData),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({
                            notification: `Article: ${this.state.title} added into database`
                        })
                    }
                })
                .catch(error => console.error('Error:', error));
        }
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
                        articlesInDatabase: myJSON,
                        displayMode: 'reader'
                    });

                }
            }, ()=> {
                this.setState({

                })
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
      const { displayMode, title, text, notification, articlesInDatabase} = this.state;
      return (
          <div className="App">
              <TopBar />
              <div className="container">
                  <div className="row">
                      <Reader getData={this.getData} handleChange={this.handleChange} search={this.searchData} get={this.getData}/>
                      <Writer postArticle={this.postArticle} handleChange={this.handleChange} title={title} text={text} />
                  </div>
                <div className="row">
                    <Display displayMode={displayMode} title={title} text={text} notification={notification} articlesInDatabase={articlesInDatabase}  />
                </div>
              </div>
          </div>
      );
  }

}

export default App;

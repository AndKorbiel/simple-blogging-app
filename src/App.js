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
        displayMode: '',
        loggedIn: false,
        status: 'Not logged in',
        user: '',
        password: '',
        currentLogRegAction: 'Register'
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

        if (!this.state.loggedIn) {
            this.setState({
                notification: 'Please login to post article'
            })
        }

        else if (postedData.title == '' || postedData.content == '') {
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

    changeAction = () => {
        let currentAction = this.state.currentLogRegAction;

        if (currentAction == 'Register') {
            currentAction = 'Login';

        }
        else {
            currentAction = 'Register';
        }
        this.setState({
            currentLogRegAction: currentAction
        });
    };

    register = () => {
        let registerData = {user: this.state.user, password: this.state.password}

        if (registerData.user == '' || registerData.password == '') {
            this.setState({
                notification: 'Please fill all matandory fields'
            })
        }
        else {
            fetch('http://localhost:8080/register', {
                method: 'POST',
                body: JSON.stringify(registerData),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({
                            notification: `User: ${this.state.user} is now registered`
                        })
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    };

    login = () => {
        let user = this.state.user;
        let password = this.state.password;

        fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify({user: user, password: password}),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((myJSON) => {
                if (myJSON.length <= 0) {
                    this.setState({
                        notification: 'Wrong username or password',
                        articlesInDatabase: []
                    })
                }
                else {
                    this.setState({
                        notification: 'You have logged in!',
                        loggedIn: true,
                        status: 'Logged in as: '+user
                    })
                }
            })
            .catch(error => console.error('Error:', error));
    };

  render() {
      const { displayMode, title, text, notification, articlesInDatabase, status, user, password, currentLogRegAction, loggedIn } = this.state;
      return (
          <div className="App">
              <TopBar status={status} handleChange={this.handleChange} register={this.register} login={this.login} user={user} password={password} changeAction={this.changeAction} currentLogRegAction={currentLogRegAction} />
              <div className="container">
                  <div className="row">
                      <Reader getData={this.getData} handleChange={this.handleChange} search={this.searchData} get={this.getData}/>
                      <Writer postArticle={this.postArticle} handleChange={this.handleChange} title={title} text={text} loggedIn={loggedIn} />
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
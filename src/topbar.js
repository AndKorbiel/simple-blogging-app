import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {handleChangeEffect, changeLogRegActionEffect, registerEffect, loginEffect} from "./redux";

class TopBar extends Component {

    render() {

        let action;
        let content;

        const changeAction =()=> {
            if (this.props.currentLogRegAction === 'Register') {
                action = 'Login';
            }
            else {
                action = 'Register';
            }
            this.props.changeLogRegAction(action)
        };

        const callRegisterOrLogin =()=> {
            const user = this.props.user;
            const password = this.props.password;

            if (this.props.currentLogRegAction === 'Register') {
                this.props.register({user: user, password: password})
            }
            else {
                this.props.login({user: user, password: password})
            }

        };

        if (this.props.loggedIn) {
            content = <div className="align-right"> <button className="btn btn-primary md" id="login" onClick={callRegisterOrLogin}>Logout</button> </div>
        }

        else {
            content = <div> <p onClick={changeAction}><span className={this.props.currentLogRegAction === 'Register' ? 'active' : ''}>Register</span> <span className={this.props.currentLogRegAction === 'Login' ? 'active' : ''}>Login</span></p>
                <input type="text" className="form-control" id="user" aria-label="Small" name="user"
            aria-describedby="inputGroup-sizing-sm" placeholder="Username..." onChange={e => this.props.handleChange(e)} />
            <input type="text" className="form-control" id="password" aria-label="Small" name="password"
                   aria-describedby="inputGroup-sizing-sm" placeholder="Password..." onChange={e => this.props.handleChange(e)} />
            <button className="btn btn-primary md" id="login" onClick={callRegisterOrLogin}>{this.props.currentLogRegAction}</button>
            </div>
        }

        return (
            <div className="topbar">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <p><span className="info">{this.props.currentLogRegAction}</span></p>
                        </div>
                        <div className="col-sm-12 col-md-8 fields">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      loggedIn: state.loggedIn,
      status: state.status,
      user: state.user,
      password: state.password,
      currentLogRegAction: state.currentLogRegAction
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (e) => {

            let value = {value: e.target.value, name: e.target.name};
            dispatch(handleChangeEffect(value));

        },
        changeLogRegAction: (currentAction) => {
            dispatch(changeLogRegActionEffect(currentAction));
        },
        register: (userData) => {
            dispatch(registerEffect(userData));
        },
        login: (userData) => {
            dispatch(loginEffect(userData))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
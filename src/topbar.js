import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {handleChangeEffect, changeLogRegActionEffect, registerEffect, loginEffect} from "./redux";

class TopBar extends Component {

    render() {

        return (
            <div className="topbar">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <p><span className="info">{this.props.currentLogRegAction}</span></p>
                        </div>
                        <div className="col-sm-12 col-md-8 fields">
                            {this.renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderContent = () => {
        if (this.props.loggedIn) {
            return <div className="align-right"> <button className="btn btn-primary md" id="login" onClick={this.callRegisterOrLogin}>Logout</button> </div>
        }

        return (
            <div> <p onClick={this.props.changeLogRegAction}><span className={this.props.currentLogRegAction === 'Register' ? 'active' : ''}>Register</span> <span className={this.props.currentLogRegAction === 'Login' ? 'active' : ''}>Login</span></p>
                <input type="text" className="form-control" id="user" aria-label="Small" name="user"
            aria-describedby="inputGroup-sizing-sm" placeholder="Username..." onChange={this.props.handleChange} />
            <input type="text" className="form-control" id="password" aria-label="Small" name="password" type="password"
                   aria-describedby="inputGroup-sizing-sm" placeholder="Password..." onChange={this.props.handleChange} />
            <button className="btn btn-primary md" id="login" onClick={this.callRegisterOrLogin}>{this.props.currentLogRegAction}</button>
            </div>
        )
    }

    callRegisterOrLogin =()=> {
        const user = this.props.user;
        const password = this.props.password;

        if (this.props.currentLogRegAction === 'Register') {
            this.props.register({user: user, password: password})
        }
        else {
            this.props.login({user: user, password: password})
        }

    };
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
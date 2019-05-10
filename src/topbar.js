import React, { Component } from 'react';
import './App.css';

class TopBar extends Component {



    render() {
        const { handleChange, status, register, login, user, password, changeAction, currentLogRegAction } = this.props;
        let action;

        if (currentLogRegAction == 'Register') {
            action = register;
        }
        else {
            action = login;
        }

        return (
            <div className="topbar">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <p><span className="info">{status}</span></p>
                        </div>
                        <div className="col-sm-12 col-md-8 fields">
                            <p onClick={changeAction}><span className={currentLogRegAction === 'Register' ? 'active' : ''}>Register</span> <span className={currentLogRegAction === 'Login' ? 'active' : ''}>Login</span></p>
                            <input type="text" className="form-control" id="user" aria-label="Small" name="user"
                                   aria-describedby="inputGroup-sizing-sm" placeholder="Username..." value={user} onChange={e => handleChange(e)} />
                            <input type="text" className="form-control" id="password" aria-label="Small" name="password"
                                   aria-describedby="inputGroup-sizing-sm" placeholder="Password..." value={password} onChange={e => handleChange(e)} />
                            <button className="btn btn-primary md" id="login" onClick={()=> action(user, password)}>{currentLogRegAction}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopBar;
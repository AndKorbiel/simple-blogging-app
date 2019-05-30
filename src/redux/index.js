import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const GET_DATA = 'GET_DATA';
const GET_DATA_ERROR = 'GET_DATA_ERROR';
const HANDLE_CHANGE = 'HANDLE_CHANGE';
const SEARCH = 'SEARCH';

const initialState = {
    title: '',
    text: '',
    notification: 'Started',
    articlesInDatabase: [],
    searchInput: '',
    displayMode: '',
    loggedIn: false,
    status: 'Not logged in',
    user: '',
    password: '',
    currentLogRegAction: 'Register'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case  GET_DATA :
            return { ...state, articlesInDatabase: action.payload, notification: 'Data fetched!', status: 'Data fetched' };
        case GET_DATA_ERROR :
            return { ...state, notification: action.payload};
        case HANDLE_CHANGE :
            return { ...state, notification: action.payload, searchInput: action.payload};
        case SEARCH :
            return {...state, articlesInDatabase: action.payload};
        default:
            return state;
    }
};

export const getData = (payload) => {
    return {
        type: GET_DATA, payload
    }
}

export const getDataError = (payload) => {
    return {
        type: GET_DATA_ERROR, payload
    }
}

export const handleChange = () => {
    return {
        type: HANDLE_CHANGE
    }
}

export const search = () => {
    return {
        type: SEARCH
    }
}

export const getDataEffect = () => {
    return (dispatch) => {
        axios.get('http://localhost:8080/articles')
                .then((res) => {
                    dispatch(getData(res.data));
                })
                .catch((err) => {
                    dispatch(getDataError(err));
                })
    }
}

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);


export default store;
//


//

//
// postArticle = () => {
//     let postedData = {title: this.state.title, content: this.state.text};
//
//     if (!this.state.loggedIn) {
//         this.setState({
//             notification: 'Please login to post article'
//         })
//     }
//
//     else if (postedData.title == '' || postedData.content == '') {
//         this.setState({
//             notification: 'Please fill all matandory fields'
//         })
//     }
//
//     else {
//         fetch('http://localhost:8080/articles', {
//             method: 'POST',
//             body: JSON.stringify(postedData),
//             headers:{
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then((res) => {
//                 if (res.status == 200) {
//                     this.setState({
//                         notification: `Article: ${this.state.title} added into database`
//                     })
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }
// };


//

//
// changeAction = () => {
//     let currentAction = this.state.currentLogRegAction;
//
//     if (currentAction == 'Register') {
//         currentAction = 'Login';
//
//     }
//     else {
//         currentAction = 'Register';
//     }
//     this.setState({
//         currentLogRegAction: currentAction
//     });
// };
//
// register = () => {
//     let registerData = {user: this.state.user, password: this.state.password}
//
//     if (registerData.user == '' || registerData.password == '') {
//         this.setState({
//             notification: 'Please fill all matandory fields'
//         })
//     }
//     else {
//         fetch('http://localhost:8080/register', {
//             method: 'POST',
//             body: JSON.stringify(registerData),
//             headers:{
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then((res) => {
//                 if (res.status == 200) {
//                     this.setState({
//                         notification: `User: ${this.state.user} is now registered`
//                     })
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     }
// };
//
// login = () => {
//     let user = this.state.user;
//     let password = this.state.password;
//
//     fetch('http://localhost:8080/login', {
//         method: 'POST',
//         body: JSON.stringify({user: user, password: password}),
//         headers:{
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//     })
//         .then((res) => {
//             return res.json();
//         })
//         .then((myJSON) => {
//             if (myJSON.length <= 0) {
//                 this.setState({
//                     notification: 'Wrong username or password',
//                     articlesInDatabase: []
//                 })
//             }
//             else {
//                 this.setState({
//                     notification: 'You have logged in!',
//                     loggedIn: true,
//                     status: 'Logged in as: '+user
//                 })
//             }
//         })
//         .catch(error => console.error('Error:', error));
// };
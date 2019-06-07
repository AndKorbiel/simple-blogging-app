import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const GET_DATA = 'GET_DATA';
const GET_DATA_ERROR = 'GET_DATA_ERROR';
const HANDLE_CHANGE_FROM_SEARCH = 'HANDLE_CHANGE_FROM_SEARCH';
const HANDLE_CHANGE_FROM_WRITER = 'HANDLE_CHANGE_FROM_WRITER';
const SEARCH = 'SEARCH';
const SEARCH_EMPTY = 'SEARCH_EMPTY';
const POST_ARTICLE = 'POST_ARTICLE';
const POST_ARTICLE_ERROR = 'POST_ARTICLE_ERROR';

const initialState = {
    title: '',
    text: '',
    notification: 'Started',
    articlesInDatabase: [],
    searchInput: '',
    displayMode: '',
    loggedIn: true,
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
        case HANDLE_CHANGE_FROM_SEARCH :
            return { ...state, notification: action.payload, searchInput: action.payload, displayMode: 'Search'};
        case HANDLE_CHANGE_FROM_WRITER :
            return { ...state, notification: 'Writing', title: action.payload.value, text: action.payload.value, displayMode: 'Writer'};
        case SEARCH :
            return {...state, articlesInDatabase: action.payload};
        case SEARCH_EMPTY :
            return {...state, notification: 'There isn\'t such article in our database'};
        case POST_ARTICLE :
            return {...state, notification: 'Article posted', articlesInDatabase: action.payload, title: action.payload.title, text: action.payload.text};
        case POST_ARTICLE_ERROR :
            return {...state, notification: 'Please fill all matandory fileds' };
        default:
            return state;
    }
};

export const getData = (payload) => {
    return {
        type: GET_DATA, payload
    }
};

export const getDataError = (payload) => {
    return {
        type: GET_DATA_ERROR, payload
    }
};

export const handleChangeFromSearch = (payload) => {
    return {
        type: HANDLE_CHANGE_FROM_SEARCH, payload
    }
};

export const handleChangeFromWriter = (payload) => {
    return {
        type: HANDLE_CHANGE_FROM_WRITER, payload
    }
};

export const search = (payload) => {
    return {
        type: SEARCH, payload
    }
};

export const searchEmpty = () => {
    return {
        type: SEARCH_EMPTY
    }
};

export const postArticle = (payload) => {
    return {
        type: POST_ARTICLE, payload
    }
};

export const postArticleError = () => {
    return {
        type: POST_ARTICLE_ERROR
    }
};

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
};

export const handleChangeEffect = (value) => {

    if (value.name === 'searchInput') {
        return (dispatch) => { dispatch(handleChangeFromSearch(value.value)) }
    }
    else {
        return (dispatch) => { dispatch(handleChangeFromWriter(value.value)) }
    }

};

export const searchEffect = (searchText) => {
    return (dispatch) => {

        axios.get('http://localhost:8080/search'+'?q=' + searchText)
            .then((res) => {
                window.location = '#search' +'?q=' + searchText;
                if (res.length <= 0) {
                    dispatch(dispatch(searchEmpty()));
                }
                else {
                    dispatch(dispatch(search(res.data)));
                }
            })
            .catch((err) => {
                dispatch(getDataError(err));
            })
    }
};

export const postArticleEffect = (postedData) => {
    return (dispatch) => {


        // if (!this.state.loggedIn) {
        //     this.setState({
        //         notification: 'Please login to post article'
        //     })
        // }
        //
        console.log(postedData)
        if (postedData.title == '' || postedData.text == '') {
            dispatch(dispatch(postArticleError()))
        }
        // }

        // else {
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
                        dispatch(dispatch(postArticle(res.data)))
                    }
                })
                .catch(error => console.error('Error:', error));
        // }
    }
};


const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);


export default store;

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
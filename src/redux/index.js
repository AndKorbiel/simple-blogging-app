import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const GET_DATA = 'GET_DATA';
const GET_DATA_ERROR = 'GET_DATA_ERROR';
const HANDLE_CHANGE_FROM_SEARCH = 'HANDLE_CHANGE_FROM_SEARCH';
const SEARCH = 'SEARCH';
const SEARCH_EMPTY = 'SEARCH_EMPTY';
const POST_ARTICLE = 'POST_ARTICLE';
const POST_ARTICLE_ERROR = 'POST_ARTICLE_ERROR';
const HANDLE_CHANGE_FROM_WRITER_TITLE = 'HANDLE_CHANGE_FROM_WRITER_TITLE';
const HANDLE_CHANGE_FROM_WRITER_TEXT = 'HANDLE_CHANGE_FROM_WRITER_TEXT';
const HANDLE_CHANGE_FROM_WRITER_USER = 'HANDLE_CHANGE_FROM_WRITER_USER';
const HANDLE_CHANGE_FROM_WRITER_PASSWORD = 'HANDLE_CHANGE_FROM_WRITER_PASSWORD';
const CHANGE_LOG_REG_ACTION = 'CHANGE_LOG_REG_ACTION';
const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';
const LOGIN_ERROR = 'LOGIN_ERROR';

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
            return { ...state, articlesInDatabase: action.payload, notification: 'Data fetched!', status: 'Data fetched', displayMode: 'Search' };
        case GET_DATA_ERROR :
            return { ...state, notification: action.payload};
        case HANDLE_CHANGE_FROM_SEARCH :
            return { ...state, notification: 'Searching', searchInput: action.payload.value, displayMode: 'Search'};
        case HANDLE_CHANGE_FROM_WRITER_TITLE :
            return { ...state, notification: 'Writing', title: action.payload.value, displayMode: 'Writer'};
        case HANDLE_CHANGE_FROM_WRITER_TEXT :
            return { ...state, notification: 'Writing', text: action.payload.value, displayMode: 'Writer'};
        case HANDLE_CHANGE_FROM_WRITER_USER :
            return { ...state, user: action.payload.value };
        case HANDLE_CHANGE_FROM_WRITER_PASSWORD :
            return { ...state, password: action.payload.value };
        case SEARCH :
            return {...state, articlesInDatabase: action.payload};
        case SEARCH_EMPTY :
            return {...state, notification: 'There isn\'t such article in our database'};
        case POST_ARTICLE :
            return {...state, notification: 'Article posted', articlesInDatabase: action.payload};
        case POST_ARTICLE_ERROR :
            return {...state, notification: 'Please fill all matandory fileds' };
        case CHANGE_LOG_REG_ACTION :
            if (action.payload === 'Login') {
                return {...state, notification: 'action changed', currentLogRegAction: 'Login'};
            }
            else {
                return {...state, notification: 'action changed', currentLogRegAction: 'Register'};
            }
        case REGISTER :
            return {...state, notification: 'New user has been registered!'};
        case LOGIN :
            if (state.loggedIn) {
                return {...state, notification: 'You have been logged out', loggedIn: false};
            }
            else {
                return {...state, notification: 'Logged in as: ' + action.payload.user, loggedIn: true};
            }

        case LOGIN_ERROR :
            return {...state, notification: 'Wrong user name of password'};
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

export const handleChangeFromWriterTitle = (payload) => {
    return {
        type: HANDLE_CHANGE_FROM_WRITER_TITLE, payload
    }
};

export const handleChangeFromWriterText = (payload) => {
    return {
        type: HANDLE_CHANGE_FROM_WRITER_TEXT, payload
    }
};

export const handleChangeFromWriterUser = (payload) => {
    return {
        type: HANDLE_CHANGE_FROM_WRITER_USER, payload
    }
};

export const handleChangeFromWriterPassword = (payload) => {
    return {
        type: HANDLE_CHANGE_FROM_WRITER_PASSWORD, payload
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

export const changeLogRegAction = (payload) => {
    return {
        type: CHANGE_LOG_REG_ACTION, payload
    }
};

export const register = (payload) => {
    return {
        type: REGISTER, payload
    }
};

export const login = (payload) => {
    return {
        type: LOGIN, payload
    }
};
export const loginError = (payload) => {
    return {
        type: LOGIN_ERROR, payload
    }
};

/* Side effects actions */
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
        return (dispatch) => { dispatch(handleChangeFromSearch(value)) }
    }

    else if (value.name === 'title') {
        return (dispatch) => { dispatch(handleChangeFromWriterTitle(value)) }
    }

    else if (value.name === 'text') {
        return (dispatch) => { dispatch(handleChangeFromWriterText(value)) }
    }

    else if (value.name === 'user') {
        return (dispatch) => { dispatch(handleChangeFromWriterUser(value)) }
    }

    else if (value.name === 'password') {
        return (dispatch) => { dispatch(handleChangeFromWriterPassword(value)) }
    }

    else {

    }

};

export const searchEffect = (searchText) => {
    return (dispatch) => {

        axios.get('http://localhost:8080/search'+'?q=' + searchText)
            .then((res) => {
                window.location = '#search' +'?q=' + searchText;
                if (res.data.length <= 0) {
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
        if (postedData.title == '' || postedData.content == '') {
            dispatch(dispatch(postArticleError()))
        }
        // }

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
                        dispatch(dispatch(postArticle(res.data)))
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }
};

export const registerEffect = (userData) => {
    return (dispatch) => {

        if (userData.user == '' || userData.password == '') {
            dispatch(dispatch(postArticleError()))
        }
        else {
            fetch('http://localhost:8080/register', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    if (res.status == 200) {
                        dispatch(dispatch(register(res.data)))
                        // this.setState({
                        //     notification: `User: ${this.state.user} is now registered`
                        // })
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }
};

export const loginEffect = (userData) => {
    return (dispatch) => {

            fetch('http://localhost:8080/login', {
                method: 'POST',
                body: JSON.stringify(userData),
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
                        dispatch(dispatch(loginError))
                    }
                    else {
                        dispatch(login(userData))
                    }
                })
                .catch(error => console.error('Error:', error));
        }
};

export const changeLogRegActionEffect = (currentAction) => {
    return (dispatch) => {
            dispatch(dispatch(changeLogRegAction(currentAction)))
    }
};

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);


export default store;
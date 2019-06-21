import  axios from 'axios';
import { getData } from './actions';
import { getDataError } from './index';

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
export const GET_DATA = 'GET_DATA';

export const getData = (payload) => {
    return {
        type: GET_DATA, payload
    }
};
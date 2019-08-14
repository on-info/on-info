import { server } from "../../../api";
import axios from 'axios';

const setToken = data => {
    sessionStorage.setItem('token', data.token);
};

const getToken = () => window.sessionStorage.getItem('token');

const removeToken = () => window.sessionStorage.removeItem('token');

const signInUser = credentials => {
    return axios({
        method:'post',
        url:`${ server }/api/auth`,
        data:credentials,
        config:{
            headers:{
                'Content-Type': 'application/json'
            }
        }
    })
};
export { signInUser, setToken, getToken, removeToken };
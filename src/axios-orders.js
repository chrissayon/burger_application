import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-2d38e.firebaseio.com/'
});

export default instance;
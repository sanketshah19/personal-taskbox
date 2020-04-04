import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:3007'
})

export default axios
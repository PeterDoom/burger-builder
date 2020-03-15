import axios from 'axios'

const instance = axios.create({
    baseURL: "https://react-burger-bd72f.firebaseio.com/"
});

export default instance

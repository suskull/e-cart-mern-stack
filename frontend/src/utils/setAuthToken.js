import axios from 'axios'

const setAuthToken = token => {
    // console.log(axios.defaults.headers.common)
    if(localStorage.token) {
        return axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    delete axios.defaults.headers.common['Authorization']


}
export default setAuthToken

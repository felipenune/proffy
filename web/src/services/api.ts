import axios from 'axios'

const api = axios.create({
  baseURL: 'http://10.255.1.77:3333',
})

export default api
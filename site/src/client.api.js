import axios from 'axios'

const BASE = 'http://localhost:8080'

export default axios.create({
  baseURL: BASE
})

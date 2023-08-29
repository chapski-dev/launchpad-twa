import axios from 'axios'
import { LAUNCHPAD_BASE_API_URL } from 'constants/api'

export const AXIOS_LAUNCHPAD_INSTANCE = axios.create({
  baseURL: LAUNCHPAD_BASE_API_URL,
})

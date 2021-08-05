/**
 * Axios instance decalration and interceptors.
 *
 * Used during every call to the RCRAInfo API.
 *
 * @link https://github.com/USEPA/e-manifest
 * @author David Graham
 *
 */
import {} from 'dotenv/config'
import axios from 'axios'

const axiosGet = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  method: 'get'
})

const axiosPost = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  method: 'post'
})

const axiosAuth = axios.create({
  baseURL: `${process.env.BASE_URL}auth/`,
  method: 'get'
})

const axiosDelete = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  method: 'delete'
})

const axiosPut= axios.create({
  baseURL: `${process.env.BASE_URL}`,
  method: 'put'
})

axiosGet.interceptors.request.use(async function (config) {
  const res = await axiosAuth({
    url: `${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`
  })
  config.headers.Authorization = 'Bearer ' + res.data.token
  return config
}, function (error) {
  console.error(error.message)
  console.error(error.res.data)
})

axiosPost.interceptors.request.use(async function (config) {
  const res = await axiosAuth({
    url: `${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`
  })
  config.headers.Authorization = 'Bearer ' + res.data.token
  return config
}, function (error) {
  console.error(error.message)
  console.error(error.res.data)
})

axiosDelete.interceptors.request.use(async function (config) {
  const res = await axiosAuth({
    url: `${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`
  })
  config.headers.Authorization = 'Bearer ' + res.data.token
  return config
}, function (error) {
  console.error(error.message)
  console.error(error.res.data)
})

axiosPut.interceptors.request.use(async function (config) {
  const res = await axiosAuth({
    url: `${process.env.RCRAINFO_API_ID}/${process.env.RCRAINFO_API_KEY}`
  })
  config.headers.Authorization = 'Bearer ' + res.data.token
  return config
}, function (error) {
  console.error(error.message)
  console.error(error.res.data)
})

export { axiosGet as get, axiosPost as post, axiosDelete as delete, axiosPut as put }

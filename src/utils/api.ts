import axios from 'axios'
import { IPlayInfo } from './interfaces'

const { NODE_ENV, REACT_APP_API_BASE_URL_PROD, REACT_APP_API_BASE_URL_DEV, REACT_APP_LIVE_TIME_URL } = process.env

const API = axios.create({
	baseURL: NODE_ENV === 'production' ? REACT_APP_API_BASE_URL_PROD : REACT_APP_API_BASE_URL_DEV,
})

const getPlayInfo = (id: string): Promise<IPlayInfo> => API.get(`vod/${id}`).then(({ data }) => data)

const getLiveURL = (): Promise<{ liveURL: string }> => API.get('live').then(({ data }) => data)

// 需要阿里云oss开启跨域
const getLiveTime = (): Promise<{ time: string; url: string; cover: string }> =>
	// eslint-disable-next-line
	API.get(REACT_APP_LIVE_TIME_URL!).then(({ data }) => data)

export { API, getPlayInfo, getLiveURL, getLiveTime }

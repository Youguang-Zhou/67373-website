import axios from 'axios'
import { IVideo } from './interfaces'

interface IVideoList {
	requestId: string
	total: number
	videoList: { video: IVideo[] }
}

interface IVideoPlayDetail {
	playInfoList: { playInfo: Array<{ playURL: string }> }
	videoBase: { title: string }
}

const { NODE_ENV, REACT_APP_API_BASE_URL_PROD, REACT_APP_API_BASE_URL_DEV, REACT_APP_LIVE_TIME_URL } = process.env

const API = axios.create({
	baseURL: NODE_ENV === 'production' ? REACT_APP_API_BASE_URL_PROD : REACT_APP_API_BASE_URL_DEV,
})

const getVideoList = async (cateId: number | undefined, pageNo = 1, pageSize = 12): Promise<IVideoList> => {
	const params = { pageNo: pageNo, pageSize: pageSize }
	const { data } = cateId
		? await API.get(`categories/${cateId}`, { params: params })
		: await API.get('videos', { params: params })
	return data
}

const getPlayURL = (id: string): Promise<IVideoPlayDetail> => API.get(`videos/${id}`).then(({ data }) => data)

const getLiveURL = (): Promise<{ liveURL: string }> => API.get('live').then(({ data }) => data)

// 需要阿里云oss开启跨域
const getLiveTime = (): Promise<{ time: string; url: string; cover: string }> =>
	// eslint-disable-next-line
	API.get(REACT_APP_LIVE_TIME_URL!).then(({ data }) => data)

export { getVideoList, getPlayURL, getLiveURL, getLiveTime }

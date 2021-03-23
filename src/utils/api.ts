import axios from 'axios'
import { IVideo } from './interfaces'

interface IVideoList {
	total: number
	videoList: Array<IVideo>
}

interface IVideoPlayDetail {
	playInfoList: Array<{ playURL: string }>
	videoBase: { title: string }
}

const API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? process.env.REACT_APP_API_BASE_URL_PROD
			: process.env.REACT_APP_API_BASE_URL_DEV,
})

const getVideoList = async (cateId: number | undefined, pageNo = 1, pageSize = 12): Promise<IVideoList> => {
	const params = { pageNo: pageNo, pageSize: pageSize }
	const { data } = cateId
		? await API.get(`categories/${cateId}`, { params: params })
		: await API.get('videos', { params: params })
	return data
}

const getPlayURL = (id: string): Promise<IVideoPlayDetail> => API.get(`videos/${id}`).then(({ data }) => data)

export { getVideoList, getPlayURL }

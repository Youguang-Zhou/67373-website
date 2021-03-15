import axios from 'axios'
import { IVideoList, IVideoPlayDetail } from './interfaces'

const API = axios.create({
	baseURL: 'https://67373upup.com/api/',
})

const getVideoList = (pageNo = 1, pageSize = 12): Promise<IVideoList> =>
	API.get('video', {
		params: {
			pageNo: pageNo,
			pageSize: pageSize,
		},
	})
		.then(({ data }) => data)
		.catch((error) => console.log(error))

const getPlayURL = (id: string): Promise<IVideoPlayDetail> =>
	API.get(`video/${id}`)
		.then(({ data }) => data)
		.catch((error) => console.log(error))

const getLiveURL = (): Promise<string> =>
	axios
		.get('https://67373upup.oss-cn-hangzhou.aliyuncs.com/live_url.txt')
		.then(({ data }) => data)
		.catch((error) => console.log(error))

export { getVideoList, getPlayURL, getLiveURL }

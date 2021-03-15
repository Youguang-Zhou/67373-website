import axios from 'axios'
import { IVideo } from '../interfaces'

interface IVideoList {
	data: {
		total: number
		videos: Array<IVideo>
	}
}

const getVideoList = (pageNo = 1, pageSize = 12): Promise<IVideoList> =>
	axios
		.get('https://67373upup.com/api/video', {
			params: {
				pageNo: pageNo,
				pageSize: pageSize,
			},
		})
		.then(({ data }) => data)
		.catch((error) => console.log(error))

export { getVideoList }

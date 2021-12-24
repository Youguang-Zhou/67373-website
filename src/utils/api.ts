import axios from 'axios'
import { MediaType } from './enums'

const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })

const { Video } = MediaType

// 获取播放列表（通过MediaType获取视频或音频）
const getVodList = async (
	mediaType: MediaType,
	pageNo: number,
	pageSize: number,
	cateId?: string // 只有请求视频的时候有用
): Promise<GetVodListResponseProps> =>
	await API.get(mediaType, { params: { pageNo, pageSize, cateId } }).then(({ data }) => {
		const currNum = (pageNo - 1) * pageSize + data.videoList.video.length
		const nextPage = currNum !== data.total ? pageNo + 1 : undefined
		return { ...data, nextPage }
	})

// 获取视频的播放信息
const getVideoInfo = async (id: string | undefined): Promise<GetVideoInfoResponseProps> =>
	id && (await API.get(`${Video}/${id}`).then(({ data }) => data))

// 获取推荐视频
const getRecommVideos = async (
	videoId: string,
	title: string,
	cateName: string,
	num: number
): Promise<GetRecommVideosResponseProps> =>
	await API.get(`${Video}/recomm`, {
		params: {
			videoId: videoId,
			title: encodeURIComponent(title),
			cateName: encodeURIComponent(cateName),
			num: num,
		},
	}).then(({ data }) => data)

// 获取搜索结果
// TODO: axios token cancellation
const getSearchResults = async (
	query: string | undefined,
	pageNo: number,
	pageSize: number
): Promise<SearchResponseProps> =>
	query &&
	(await API.get('search', { params: { query, pageNo, pageSize } }).then(({ data }) => {
		// 这个接口会返回audioId，为了与VodProps同步，把audioId改回videoId
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data.mediaList.map((media: any) => {
			if (media.mediaType === 'audio') {
				media.audio.videoId = media.audio.audioId
			}
		})
		return data
	}))

export { getVodList, getVideoInfo, getRecommVideos, getSearchResults }

import axios from 'axios'
import { MediaType } from './enums'

const { REACT_APP_API_BASE_URL, REACT_APP_API_GAME_LIST_URL } = process.env

const API = axios.create({ baseURL: REACT_APP_API_BASE_URL })

// 获取播放列表（通过MediaType获取视频或音频）
const getVodList = (
	mediaType: MediaType,
	pageNo = 1,
	pageSize = 12,
	cateId?: string // 只有请求视频的时候有用
): Promise<GetVodListResponseProps> =>
	API.get(mediaType, { params: { pageNo, pageSize, cateId } }).then(({ data }) => {
		// 判断是否还有更多音视频
		const currNum = (pageNo - 1) * pageSize + data.videoList.video.length
		const nextPage = currNum !== data.total ? pageNo + 1 : undefined
		// 如果当前请求是音频，则排序
		if (mediaType == MediaType.Audio) {
			const audios = data.videoList.video
			const originals = audios.filter(
				({ title }: VodProps) =>
					title === '童话镇' || title === '阿婆说' || title === '弦上有春秋'
			)
			const covers = audios.filter(
				({ title }: VodProps) =>
					title !== '童话镇' && title !== '阿婆说' && title !== '弦上有春秋'
			)
			data.videoList.video = [...originals, ...covers]
		}
		return { ...data, nextPage }
	})

// 获取视频的播放信息
const getVideoInfo = (id: string | undefined): Promise<GetVideoInfoResponseProps> =>
	API.get(`${MediaType.Video}/${id}`).then(({ data }) => data)

// 获取歌词
const getLyrics = (id: string | undefined): Promise<GetLyricsResponseProps> =>
	API.get(`lyrics/${id}`).then(({ data }) => data)

// 获取推荐视频
const getRecommVideos = (
	videoId: string,
	title: string,
	cateName: string,
	num = 20
): Promise<GetRecommVideosResponseProps> =>
	API.get(`${MediaType.Video}/recomm`, {
		params: {
			videoId: videoId,
			title: encodeURIComponent(title),
			cateName: encodeURIComponent(cateName),
			num: num,
		},
	}).then(({ data }) => data)

// 获取搜索结果
// TODO: axios token cancellation
const getSearchResults = (
	query: string | undefined,
	pageNo: number,
	pageSize: number
): Promise<SearchResponseProps> =>
	API.get('search', { params: { query, pageNo, pageSize } }).then(({ data }) => {
		// 这个接口会返回audioId，为了与VodProps同步，把audioId改回videoId
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data.mediaList.map((media: any) => {
			if (media.mediaType === 'audio') {
				media.audio.videoId = media.audio.audioId
			}
		})
		return data
	})

// 获取筛选游戏直播回放结果
const getSearchGameResults = (
	tag: string | undefined,
	pageNo: number,
	pageSize: number
): Promise<SearchGameResponseProps> =>
	API.get('searchGame', { params: { tag, pageNo, pageSize } }).then(({ data }) => data)

// 获取所有播过的游戏列表
const getGameListResults = () =>
	REACT_APP_API_GAME_LIST_URL && axios.get(REACT_APP_API_GAME_LIST_URL).then(({ data }) => data)

export {
	getVodList,
	getVideoInfo,
	getLyrics,
	getRecommVideos,
	getSearchResults,
	getSearchGameResults,
	getGameListResults,
}

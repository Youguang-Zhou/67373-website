/// <reference types="react-scripts" />

declare interface VodProps {
	videoId: string
	title: string
	duration: number
	description: string
	cateName: string
	coverURL: string
	creationTime: string
}

declare interface GetVodListResponseProps {
	requestId: string
	total: number
	videoList: { video: VodProps[] }
	nextPage: number
}

declare interface GetVideoInfoResponseProps {
	requestId: string
	videoInfo: VodProps
	playInfo: Array<{ playURL: string }>
}

declare interface GetLyricsResponseProps {
	lyrics: string[]
}

declare interface GetRecommVideosResponseProps {
	requestId: string
	videoList: VodProps[]
}

declare interface SearchResponseProps {
	requestId: string
	total: number
	mediaList: Array<{
		mediaType: string
		audio: VodProps
		video: VodProps
	}>
}

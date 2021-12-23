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
	requestId: string | null
	total: number | null
	videoList: { video: VodProps[] } | null
}

declare interface SearchResponseProps {
	requestId: string | null
	total: number | null
	mediaList: Array<{
		mediaType: string
		audio: VodProps
		video: VodProps
	}> | null
}

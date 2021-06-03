export interface IVideo {
	coverURL: string
	creationTime: string
	duration: number
	title: string
	videoId: string
}

export interface IVideoList {
	requestId: string
	total: number
	videoList: { video: IVideo[] }
}

export interface IVideoPlayDetail {
	playInfoList: { playInfo: Array<{ playURL: string }> }
	videoBase: IVideo
}

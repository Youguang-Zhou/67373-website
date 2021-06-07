export interface IVod {
	coverURL: string
	creationTime: string
	duration: number
	title: string
	videoId: string
}

export interface IPlayList {
	requestId: string | null
	total: number | null
	videoList: { video: IVod[] } | null
}

export interface IPlayInfo {
	playInfoList: { playInfo: Array<{ playURL: string }> }
	videoBase: IVod
}

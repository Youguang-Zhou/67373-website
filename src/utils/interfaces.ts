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
	requestId: string | null
	videoBase: IVod | null
	playInfoList: { playInfo: Array<{ playURL: string }> } | null
}

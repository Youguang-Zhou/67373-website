export interface IVideo {
	cateName: string
	coverURL: string
	createTime: string
	duration: number
	title: string
	videoId: string
}

export interface IVideoList {
	total: number
	videoList: Array<IVideo>
}

export interface IPlayInfo {
	Bitrate: string
	CreationTime: string
	Definition: string
	Duration: string
	Encrypt: number
	Format: string
	Fps: string
	Height: number
	JobId: string
	ModificationTime: string
	NarrowBandType: string
	PlayURL: string
	PreprocessStatus: string
	Size: number
	Specification: string
	Status: string
	StreamType: string
	WatermarkId: string
	Width: number
}

export interface IVideoPlayDetail {
	data: {
		PlayInfoList: {
			PlayInfo: Array<IPlayInfo>
		}
		RequestId: string
		VideoBase: {
			CoverURL: string
			CreationTime: string
			Duration: string
			MediaType: string
			OutputType: string
			Status: string
			Title: string
			TranscodeMode: string
			VideoId: string
		}
	}
}

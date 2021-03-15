export interface IVideo {
	AppId: string
	CateId: number
	CateName: string
	CommentsNum: number
	CoverURL: string
	CreateTime: string
	CreationTime: string
	Duration: number
	ModificationTime: string
	ModifyTime: string
	Size: number
	Snapshots: {
		Snapshot: Array<string>
	}
	Status: string
	StorageLocation: string
	Title: string
	VideoId: string
}

export interface IVideoList {
	data: {
		total: number
		videos: Array<IVideo>
	}
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

export interface IPlayOptions {
	sources: Array<{ src: string; type: string }>
}

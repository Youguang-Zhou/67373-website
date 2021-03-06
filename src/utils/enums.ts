export enum PlayOrder {
	Repeat = 'Repeat', // 循环播放
	RepeatOne = 'RepeatOne', // 单曲循环
	Shuffle = 'Shuffle', // 随机播放
}

export enum LiveStatus {
	WillStart = 'WillStart', // 即将开始
	IsLive = 'IsLive', // 正在直播
	IsEnded = 'IsEnded', // 结束直播
}

export enum MediaType {
	Video = 'videos', // 视频的url前缀
	Audio = 'audios', // 音频的url前缀
}

import moment from 'moment'

// 格式化duration，单位是秒
export const formatDuration = (duration: number): string => {
	const time = moment.utc(duration * 1000)
	return time.hour() == 0 ? time.format('mm:ss') : time.format('HH:mm:ss')
}

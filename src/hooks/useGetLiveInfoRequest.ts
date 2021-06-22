import moment from 'moment'
import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { LiveStatus } from '../utils/enums'

const emptyData = { status: LiveStatus.IsEnded, duration: null, time: null, url: null, cover: null }

interface GetLyricsResponseProps {
	response: {
		status: LiveStatus
		duration: number | null
		time: string | null
		url: string | null
		cover: string | null
	}
	isLoading: boolean
	hasError: boolean
}

const useGetLiveInfoRequest = (): GetLyricsResponseProps => {
	const [response, setResponse] = useState(emptyData)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		let timer = 0
		setIsLoading(true)
		setHasError(false)
		API.get('live')
			.then(({ data }) => {
				if (data) {
					timer = window.setInterval(() => {
						const currTime = moment(new Date())
						const liveTime = moment(new Date(data.time))
						if (currTime.isBefore(liveTime)) {
							// 即将开始
							setResponse({
								status: LiveStatus.WillStart,
								duration: liveTime.diff(currTime),
								...data,
							})
						} else {
							// 直播已经开始
							clearInterval(timer)
							setResponse({
								status: LiveStatus.IsLive,
								...data,
							})
						}
					}, 1000)
				} else {
					setHasError(true)
				}
			})
			.catch(() => {
				setResponse(emptyData)
				setHasError(true)
			})
			.finally(() => setIsLoading(false))
		return () => clearInterval(timer)
	}, [])

	return { response, isLoading, hasError }
}

export default useGetLiveInfoRequest

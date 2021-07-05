import moment from 'moment'
import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { LiveStatus } from '../utils/enums'

const emptyData = { status: LiveStatus.IsEnded, duration: null, time: null, url: null, cover: null }

interface GetLyricsResponseProps {
	response: {
		status: LiveStatus
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
		setIsLoading(true)
		setHasError(false)
		API.get('liveInfo')
			.then(({ data }) => {
				if (data.time) {
					const currTime = moment(new Date())
					const liveTime = moment(new Date(data.time))
					if (currTime.isBefore(liveTime)) {
						setResponse({ status: LiveStatus.WillStart, ...data })
					} else {
						setResponse({ status: LiveStatus.IsLive, ...data })
					}
				} else {
					setHasError(true)
				}
			})
			.catch(() => {
				setResponse(emptyData)
				setHasError(true)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return { response, isLoading, hasError }
}

export default useGetLiveInfoRequest

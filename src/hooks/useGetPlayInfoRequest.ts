import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { VodProps } from '../utils/interfaces'

const emptyData = { requestId: null, videoInfo: null, playInfo: null }

interface GetPlayInfoResponseProps {
	response: {
		requestId: string | null
		videoInfo: VodProps | null
		playInfo: Array<{ playURL: string }> | null
	}
	isLoading: boolean
	hasError: boolean
}

const useGetPlayInfoRequest = (id: string | undefined): GetPlayInfoResponseProps => {
	const [response, setResponse] = useState(emptyData)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		if (id) {
			setIsLoading(true)
			setHasError(false)
			API.get(`vod/${id}`)
				.then(({ data }) => (data.requestId ? setResponse(data) : setHasError(true)))
				.catch(() => {
					setResponse(emptyData)
					setHasError(true)
				})
				.finally(() => setIsLoading(false))
		} else {
			setResponse(emptyData)
			setHasError(true)
		}
	}, [id])

	return { response, isLoading, hasError }
}

export default useGetPlayInfoRequest

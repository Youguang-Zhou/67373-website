import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { IVod } from '../utils/interfaces'

const emptyData = { requestId: null, videoBase: null, playInfoList: null }

interface IGetPlayInfoResponse {
	response: {
		requestId: string | null
		videoBase: IVod | null
		playInfoList: { playInfo: Array<{ playURL: string }> } | null
	}
	isLoading: boolean
	hasError: boolean
}

const useGetPlayInfoRequest = (id: string | undefined): IGetPlayInfoResponse => {
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

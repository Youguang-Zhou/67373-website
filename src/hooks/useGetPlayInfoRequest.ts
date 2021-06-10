import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { IPlayInfo } from '../utils/interfaces'

interface IGetPlayInfoResponse {
	response: IPlayInfo
	isLoading: boolean
	hasError: boolean
}

const useGetPlayInfoRequest = (id: string): IGetPlayInfoResponse => {
	const [response, setResponse] = useState({ requestId: null, videoBase: null, playInfoList: null })
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		setHasError(false)
		setIsLoading(true)
		API.get(`vod/${id}`)
			.then(({ data }) => {
				data.requestId ? setResponse(data) : setHasError(true)
				setIsLoading(false)
			})
			.catch(() => setHasError(true))
	}, [id])

	return { response, isLoading, hasError }
}

export default useGetPlayInfoRequest

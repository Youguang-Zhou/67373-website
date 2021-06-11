import { useEffect, useState } from 'react'
import { API } from '../utils/api'

interface IGetLyricsResponse {
	response: string
	isLoading: boolean
	hasError: boolean
}

const useGetLyricsRequest = (id: string | undefined): IGetLyricsResponse => {
	const [response, setResponse] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		if (id) {
			setIsLoading(true)
			setHasError(false)
			API.get(`lyrics/${id}`)
				.then(({ data }) => (data ? setResponse(data) : setHasError(true)))
				.catch(() => {
					setResponse('')
					setHasError(true)
				})
				.finally(() => setIsLoading(false))
		} else {
			setResponse('')
			setHasError(true)
		}
	}, [id])

	return { response, isLoading, hasError }
}

export default useGetLyricsRequest

import { useEffect, useState } from 'react'
import { API } from '../utils/api'

const emptyData = { lyrics: null }

interface GetLyricsResponseProps {
	response: { lyrics: string[] | null }
	isLoading: boolean
	hasError: boolean
}

const useGetLyricsRequest = (id: string | undefined): GetLyricsResponseProps => {
	const [response, setResponse] = useState(emptyData)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		if (id) {
			setIsLoading(true)
			setHasError(false)
			API.get(`lyrics/${id}`)
				.then(({ data }) => (data ? setResponse(data) : setHasError(true)))
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

export default useGetLyricsRequest

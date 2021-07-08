import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { VodProps } from '../utils/interfaces'

const emptyData = { requestId: null, total: null, videoList: null }

interface GetRecommVideosResponseProps {
	response: {
		requestId: string | null
		videoList: VodProps[] | null
	}
	isLoading: boolean
	hasError: boolean
}

const useGetRecommVideosRequest = (
	videoId?: string,
	title?: string,
	cateName?: string,
	num?: number
): GetRecommVideosResponseProps => {
	const [response, setResponse] = useState(emptyData)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		if (videoId && title && cateName && num) {
			setIsLoading(true)
			setHasError(false)
			API.get('/videos/recomm', {
				params: {
					videoId: videoId,
					title: encodeURIComponent(title),
					cateName: encodeURIComponent(cateName),
					num: num,
				},
			})
				.then(({ data }) => {
					data.requestId ? setResponse(data) : setHasError(true)
				})
				.catch(() => {
					setResponse(emptyData)
					setHasError(true)
				})
				.finally(() => setIsLoading(false))
		}
	}, [videoId, title, cateName, num])

	return { response, isLoading, hasError }
}

export default useGetRecommVideosRequest

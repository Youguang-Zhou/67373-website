import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { VodProps } from '../utils/interfaces'

const emptyData = { requestId: null, total: null, videoList: null }

interface GetPlaylistResponseProps {
	response: {
		requestId: string | null
		total: number | null
		videoList: { video: VodProps[] } | null
	}
	isLoading: boolean
	hasError: boolean
	hasMore: boolean
}

const useGetPlaylistRequest = (
	cateId: string | undefined,
	pageNo: number,
	pageSize: number
): GetPlaylistResponseProps => {
	const [response, setResponse] = useState(emptyData)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [hasMore, setHasMore] = useState(true)

	useEffect(() => {
		if (cateId) {
			setIsLoading(true)
			setHasError(false)
			API.get('vod', { params: { cateId: cateId, pageNo: pageNo, pageSize: pageSize } })
				.then(({ data }) => {
					data.requestId ? setResponse(data) : setHasError(true)
					setHasMore((pageNo - 1) * pageSize + data.videoList.video.length !== data.total)
				})
				.catch(() => {
					setResponse(emptyData)
					setHasError(true)
					setHasMore(false)
				})
				.finally(() => setIsLoading(false))
		} else {
			setResponse(emptyData)
			setHasError(true)
			setHasMore(false)
		}
	}, [cateId, pageNo])

	return { response, isLoading, hasError, hasMore }
}

export default useGetPlaylistRequest

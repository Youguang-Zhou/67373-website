import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { MediaType } from '../utils/enums'
import { VodProps } from '../utils/interfaces'

const emptyData = { requestId: null, total: null, videoList: null }

interface GetVodListResponseProps {
	response: {
		requestId: string | null
		total: number | null
		videoList: { video: VodProps[] } | null
	}
	isLoading: boolean
	hasError: boolean
	hasMore: boolean
}

const useGetVodListRequest = (
	mediaType: MediaType,
	pageNo: number,
	pageSize: number,
	cateId?: string // 只有请求视频的时候有用
): GetVodListResponseProps => {
	const [response, setResponse] = useState(emptyData)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [hasMore, setHasMore] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		setHasError(false)
		API.get(mediaType, { params: { cateId: cateId, pageNo: pageNo, pageSize: pageSize } })
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
	}, [mediaType, pageNo, pageSize, cateId])

	return { response, isLoading, hasError, hasMore }
}

export default useGetVodListRequest

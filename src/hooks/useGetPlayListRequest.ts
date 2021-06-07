import { useEffect, useState } from 'react'
import { API } from '../utils/api'
import { IPlayList } from '../utils/interfaces'

interface IGetPlayListResponse {
	data: IPlayList
	isLoading: boolean
	hasError: boolean
	hasMore: boolean
}

const useGetPlayListRequest = (cateId: string | undefined, pageNo: number, pageSize: number): IGetPlayListResponse => {
	const [data, setData] = useState({ requestId: null, total: null, videoList: null })
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)
	const [hasMore, setHasMore] = useState(true)

	useEffect(() => {
		setHasError(false)
		setIsLoading(true)
		API.get('vod', { params: { cateId: cateId, pageNo: pageNo, pageSize: pageSize } })
			.then(({ data }) => {
				setData(data)
				setIsLoading(false)
				setHasMore((pageNo - 1) * pageSize + data.videoList.video.length !== data.total)
			})
			.catch(() => setHasError(true))
	}, [cateId, pageNo])

	return { data, isLoading, hasError, hasMore }
}

export default useGetPlayListRequest
